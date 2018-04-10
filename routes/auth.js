var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
var passport = require('passport');
var config = require('../middleware/config');

let User = mongoose.model('User');

/* LOGIN MICROSOFT */
router.get('/auth/login/microsoft',
function(req, res, next) {
  console.log("LOGIN");
  
  passport.authenticate('azuread-openidconnect', 
    { 
      response: res,                      // required
      failureRedirect: '/' 
    }
  )(req, res, next);
},
function(req, res) {
  console.log('Login was called in the Sample');
  res.redirect('/');
});

/* LOGIN GOOGLE */
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

/* LOGOUT */
router.get('/auth/logout', function(req, res){
  let user = req.user;
  req.session.destroy(function(err) {
    req.logOut();
    switch(user.accountType) {
      case 'google':
        res.redirect('/');
        break;
      case 'azure-ad':
        res.redirect(config.destroySessionUrl);
        break;
      default:
        res.redirect('/');
        break;
    }
  });
});

/* GET RETURN_URL MICROSOFT */
router.get('/auth/openid/return',
function(req, res, next) {
  console.log("RETURN GET");
  passport.authenticate('azuread-openidconnect', 
    { 
      response: res,                      // required
      failureRedirect: '/'  
    }
  )(req, res, next);
},
function(req, res) {
  console.log('We received a return from AzureAD.');
  res.redirect('/');
});

/* GET RETURN_URL GOOGLE */
router.get('/auth/callback/google', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("SESSION: " + req.session.phoneid);
  if(req.session.phoneid !== undefined) {
    let user = req.user;
    user.phoneid = req.session.phoneid;
    user.save(function(err, usr) {
      if(err) {console.log(err);}
    });
  }
    res.redirect('/');
  });

/* POST RETURN_URL MICROSOFT */
router.post('/auth/openid/return',
function(req, res, next) {
  console.log("RETURN POST");
  passport.authenticate('azuread-openidconnect', 
    { 
      response: res,                      // required
      failureRedirect: '/'  
    }
  )(req, res, next);
},
function(req, res) {
  console.log('We received a return from AzureAD.');
  console.log("SESSION: " + req.session);
  console.log("SESSION: " + req.session.phoneid);
  if(req.session.phoneid !== undefined) {
    let user = req.user;
    user.phoneid = req.session.phoneid;
    user.save(function(err, usr) {
      if(err) {console.log(err);}
    });
  }
  res.redirect('/');
});

/* GET CURRENT USER */
router.get('/auth/user', function(req, res) {
  if(req.isAuthenticated()) {
    res.json(req.user);
  }
  else {
    res.json({message: "Please log in"});
  }
});

/* IS USER LOGGED IN */
router.get('/auth/isLoggedIn', function(req, res) {
  res.json({isLoggedIn: req.isAuthenticated()});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

module.exports = router;