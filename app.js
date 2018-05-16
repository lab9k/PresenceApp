var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
const MongoStore = require('connect-mongo')(expressSession);
var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var config = require('./middleware/config');
const graphHelper = require('./middleware/graphHelper');
var cors = require('cors')
require('dotenv').config({path: './app-env.env'});

require('./models/User');
require('./models/Location');
require('./models/Campus');
require('./models/Segment');
require('./models/Message');
var app = express();
app.use(cors());

//mongoose.connect('mongodb://localhost/presencedb2');
mongoose.connect(process.env.PRESENCE_DATABASE);
var index = require('./routes/index');
var auth = require('./routes/auth');

let User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://wiw.lab9k.gent/auth/callback/google"
  //callbackURL: "http://localhost:4200/auth/callback/google"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findById(profile.id, function (err, user) {
    if(!user) {
      user = new User({
        _id: profile.id, 
        name: profile.displayName, 
        picture: profile.photos[0].value,
        checkin: [], 
        role: "user",
        messages: [],
        accountType: "google"
      });
      user.save(function(err, usr) {
        if(err) {console.log(err);}
        return cb(err, user);
      });
    }
    else if(profile.photos[0].value !== user.picture) {
      user.picture = profile.photos[0].value;
      user.save(function(err, usr) {
        if(err) {console.log(err);}
        return cb(err, user);
      });
    }
    return cb(err, user);
  });
}
));

passport.use(new OIDCStrategy({
  identityMetadata: config.creds.identityMetadata,
  clientID: config.creds.clientID,
  responseType: config.creds.responseType,
  responseMode: config.creds.responseMode,
  redirectUrl: config.creds.redirectUrl,
  allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
  clientSecret: config.creds.clientSecret,
  validateIssuer: config.creds.validateIssuer,
  isB2C: config.creds.isB2C,
  issuer: config.creds.issuer,
  passReqToCallback: config.creds.passReqToCallback,
  scope: config.creds.scope,
  loggingLevel: config.creds.loggingLevel,
  nonceLifetime: config.creds.nonceLifetime,
  nonceMaxAmount: config.creds.nonceMaxAmount,
  useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
  cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
  clockSkew: config.creds.clockSkew,
},
function(iss, sub, profile, accessToken, refreshToken, done) {
  if (!profile.oid) {
    return done(new Error("No oid found"), null);
  }
  // asynchronous verification, for effect...
  process.nextTick(function () {
    User.findById(profile.oid, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        // "Auto-registration"
        graphHelper.getProfilePhoto(accessToken, (errPhoto, photo) => {
          if(!errPhoto) {
            console.log(photo);
            user = new User({
              _id: profile.oid, 
              name: profile.displayName, 
              checkin: [], 
              role: "user",
              messages: [],
              picture: photo,
              accountType: 'azure-ad'
            });
            console.log(user);
            user.save(function(err, usr) {
              if(err) {console.log(err);}
            });
          } else {
            user = new User({
              _id: profile.oid, 
              name: profile.displayName, 
              checkin: [], 
              role: "user",
              messages: [],
              accountType: "azure-ad"
            });
            console.log(user);
            user.save(function(err, usr) {
              if(err) {console.log(err);}
            });
          }
          return done(null, user);
        });
      }
      else {
        return done(null, user);
      }
    });
  });
}
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({ 
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: false,
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/', auth);

app.use(express.static(path.join(__dirname, 'dist')));

app.all('*', (req, res)=>{
  const indexFile =`${path.join(__dirname, 'dist')}/index.html`;
  res.status(200).sendFile(indexFile);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;