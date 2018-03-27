var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
var io = require('../io');
var passport = require('passport');
var config = require('../config');

let Location = mongoose.model('Location');
let User = mongoose.model('User');
let Campus = mongoose.model('Campus');
let Segment = mongoose.model('Segment');

// socket io
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('checkin', function (data) {
    console.log(data);
    io.emit('new-checkin', { user: data });
  });
});

/* Checkin user */
router.post('/API/checkin/', function(req, res, next) {
  if(!req.body.userid || !req.body.locationid) {
    return res.status(400).json(
      {message: 'Missing fields'}
    );
  }

  let user = null;
  let id = req.body.locationid;
  
  User.findById(req.body.userid, function(err, usr) {
    if(err) {return next(err);}
    if(usr) {
      user = usr;
      
      Location.findOne({stickers: req.body.locationid}, function(err, location) {
        if (err) { return next(err);}
        if(!location) {
          return res.status(200).json({message: 'New sticker'});
        }
        if(!location.name) {
          user.checkin = { location: location, time: +new Date()};
          location.save(function(err, loc) {
            if (err) { return next(err);}
          });
          user.save(function(er, usr) {
            if(err) { return next(err);}
          });
          return res.status(200).json({message: 'Location has no name.'});
        }
        user.checkin = { location: location, time: +new Date()};
        user.save(function(err, usr) {
          if (err) { return next(err);}
          res.json(user);
        });
      });
    }
    else {
      return res.status(400).json({message: 'User does not exist'});
    }  
  });
});

/* REMOVE CHECKIN */
router.delete('/API/checkin/:userid', function(req, res, next) {
  if(!req.params.userid) {
    return res.status(400).json(
      {message: 'Missing fields'}
    );
  }
  
  User.findById(req.params.userid, function(err, user) {
    user.checkin = null;
    user.save(function(err, usr) {
      if (err) { return next(err); }
      res.json(usr);
    })
  });

});

/* CREATE USER */
router.post('/API/user/', function(req, res, next) {
  let user = new User(req.body);
  user.save(function(err, usr) {
    if (err) { return next(err);}
    res.json(usr);
  })
});

/* CREATE CAMPUS */
router.post('/API/campus/', function(req, res, next) {
  let campus = new Campus(req.body);
  campus.save(function(err, camp) {
    if(err) { return next(err);}
    res.json(camp);
  })
});

/* CREATE SEGMENT */
router.post('/API/segment/', function(req, res, next) {
  let segment = new Segment(req.body);
  segment.save(function(err, seg) {
    if(err) { return next(err);}
    res.json(seg);
  })
});

/* CREATE LOCATION */
router.post('/API/location/', function(req, res, next) {
  let location = new Location(req.body);
  location.save(function(err, loc) {
    if(err) { return next(err);}
    res.json(loc);
  })
});

/* UPDATE USER */
router.put('/API/user/', function(req, res, next) {
  console.log(req.body);
  User.findByIdAndUpdate(req.body._id, {"$set": req.body}, function (err, user) {
    if (err) { return next(err); }
    console.log(user);
    res.json(user);
  })
});

/* UPDATE CAMPUS */
router.put('/API/campus/', function(req, res, next) {
  console.log(req.body);
  Campus.findByIdAndUpdate(req.body._id, req.body, function (err, campus) {
    if (err) { return next(err); }
    res.json(campus);
  })
});

/* UPDATE SEGMENT */
router.put('/API/segment/', function(req, res, next) {
  console.log(req.body);
  Segment.findByIdAndUpdate(req.body._id, req.body, function (err, segment) {
    if (err) { return next(err); }
    res.json(segment);
  })
});

/* UPDATE LOCATION */
router.put('/API/location/', function(req, res, next) {
  console.log(req.body);
  Location.findByIdAndUpdate(req.body._id, req.body, function (err, location) {
    if (err) { return next(err); }
    res.json(location);
  })
});

/* GET CAMPUSES */
router.get('/API/campuses', function(req, res, next) {
  Campus.aggregate([
    {$unwind: {"path": "$segments", "preserveNullAndEmptyArrays": true}},
    {$lookup:
      {
        from: "segments",
        localField: "segments",
        foreignField: "_id",
        as: "segment"
      }
    },
    {$lookup:
      {
        from: "locations",
        localField: "segment.locations",
        foreignField: "_id",
        as: "locations"
      }
    },
    {
      $group: {
        _id: "$_id",
        name: {$first: "$name"},
        segments: { $push: {
          _id: {$arrayElemAt:["$segment._id", 0]},
          name: {$arrayElemAt:["$segment.name", 0]},
          locations: "$locations"}
        },
      }
    },
  ],function(err, campuses) {
    if(err) {next(err);}
    
    res.json(campuses);
  });
});

/* GET SEGMENTS */
router.get('/API/segments', function(req, res, next) {
  Segment.aggregate([
    {$lookup:
      {
        from: "locations",
        localField: "locations",
        foreignField: "_id",
        as: "locations"
      }
    }
  ],function(err, segments) {
    if(err) {next(err);}
    
    res.json(segments);
  });
});

/* GET LOCATIONS */
router.get('/API/locations/', function(req, res, next) {
  Location.find(function(err, locations) {
    if(err) {return next(err);}
    res.json(locations);
  });
});

/* GET USERS */
router.get('/API/users', function(req, res, next) {
  User.find(function(err, users) {
    if (err) { return next(err); }
    res.json(users);
  });
});

/* GET USER BY ID */
router.get('/API/user/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) { return next(err); } 
    if(user) {
      res.json(user);
    }
    else {
      return res.status(400).json({message: 'User does not exist'});
    } 
  });
});

/* GET CAMPUS BY ID */
router.get('/API/campus/:id', function(req, res, next) {
  Campus.aggregate([
    {$match: {_id: mongoose.Types.ObjectId(req.params.id)}},
    {$unwind: {"path": "$segments", "preserveNullAndEmptyArrays": true}},
    {$lookup:
      {
        from: "segments",
        localField: "segments",
        foreignField: "_id",
        as: "segment"
      }
    },
    {$lookup:
      {
        from: "locations",
        localField: "segment.locations",
        foreignField: "_id",
        as: "locations"
      }
    },
    {
      $group: {
        _id: "$_id",
        name: {$first: "$name"},
        segments: { $push: {
          _id: {$arrayElemAt:["$segment._id", 0]},
          name: {$arrayElemAt:["$segment.name", 0]},
          locations: "$locations"}
        },
      }
    },
  ],function(err, campus) {
    if (err) {next(err);}
    if (campus) {
      res.json(campus);
    } else {
      res.status(400).json({message: "Campus not found."});
    } 
  });
});

/* GET SEGMENT BY ID */
router.get('/API/segment/:id', function(req, res, next) {
  Segment.aggregate([
    {$match: {_id: mongoose.Types.ObjectId(req.params.id)}},
    {$lookup:
      {
        from: "locations",
        localField: "locations",
        foreignField: "_id",
        as: "locations"
      }
    }
  ],function(err, segment) {
    if (err) {next(err);}
    if (segment) {
      res.json(segment);
    } else {
      res.status(400).json({message: "Segment not found."});
    } 
  });
});

/* GET LOCATION BY ID */
router.get('/API/location/:id', function(req, res, next) {
  Location.findById(req.params.id, function(err, location) {
    if (err) { return next(err); } 
    if(location) {
      res.json(location);
    }
    else {
      return res.status(400).json({message: 'Location does not exist'});
    } 
  });
});

/* GET USER BY NAME */
router.get('/API/user/name/:name', function(req, res, next) {
  User.find({name: req.params.name}, function(err, user) {
    if (err) { return next(err); }
    if (user[0]) {
      res.json(user[0]);
    } else {
      res.status(400).json({message: "User not found."});
    }
  });
});

/* GET CAMPUS BY NAME */
router.get('/API/campus/name/:name', function(req, res, next) {
  Campus.aggregate([
    {$match: {name: req.params.name}},
    {$unwind: {"path": "$segments", "preserveNullAndEmptyArrays": true}},
    {$lookup:
      {
        from: "segments",
        localField: "segments",
        foreignField: "_id",
        as: "segment"
      }
    },
    {$lookup:
      {
        from: "locations",
        localField: "segment.locations",
        foreignField: "_id",
        as: "locations"
      }
    },
    {
      $group: {
        _id: "$_id",
        name: {$first: "$name"},
        segments: { $push: {
          _id: {$arrayElemAt:["$segment._id", 0]},
          name: {$arrayElemAt:["$segment.name", 0]},
          locations: "$locations"}
        },
      }
    },
  ],function(err, campus) {
    if (err) {next(err);}
    if (campus) {
      res.json(campus);
    } else {
      res.status(400).json({message: "Campus not found."});
    } 
  });
});

/* GET SEGMENT BY NAME */
router.get('/API/segment/name/:name', function(req, res, next) {
  Segment.aggregate([
    {$match: {name: req.params.name}},
    {$lookup:
      {
        from: "locations",
        localField: "locations",
        foreignField: "_id",
        as: "locations"
      }
    }
  ],function(err, segment) {
    if (err) {next(err);}
    if (segment) {
      res.json(segment);
    } else {
      res.status(400).json({message: "Segment not found."});
    } 
  });
});

/* GET LOCATION BY NAME */
router.get('/API/location/name/:name', function(req, res, next) {
  Location.find({name: req.params.name}, function(err, location) {
    if (err) { return next(err); }
    if (location[0]) {
      res.json(location[0]);
    } else {
      res.status(400).json({message: "Location not found."});
    }
  });
});

/* GET LOCATION WITH STICKER */
router.get('/API/location/sticker/:sticker', function(req, res, next) {
  Location.find({stickers: {"$in": [req.params.sticker]}}, function(err, location) {
    if (err) { return next(err); }
    if (location) {
      res.json(location);
    } else {
      res.status(400).json({message: "Location not found."});
    }
  });
});

router.get('/login',
function(req, res, next) {
  console.log("LOGIN");
  passport.authenticate('azuread-openidconnect', 
    { 
      response: res,                      // required
      resourceURL: config.resourceURL,    // optional. Provide a value if you want to specify the resource.
      customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
      failureRedirect: '/' 
    }
  )(req, res, next);
},
function(req, res) {
  console.log('Login was called in the Sample');
  res.redirect('/');
});

/* GET USER WITH PHONEID */
router.get('/API/user/phoneid/:phoneid', function(req, res, next) {
  User.find({phoneid: req.params.phoneid}, function(err, user) {
    if (err) { return next(err); }
    if (user[0]) {
      res.json(user[0]);
    } else {
      res.status(400).json({message: "User not found."});
    }
  });
});

/* REGISTER */
router.get('/API/register/:phoneid', function(req, res, next) {
  if(!req.params.phoneid) {
    res.status(400).json({message: "Enter phoneid"});
  }
  if(req.isAuthenticated()) {
    if(!req.user.phoneid) {
      let usr = req.user;
      usr.phoneid = req.params.phoneid;
      usr.save(function(err, us) {
        if(err) {console.log(err);}
        res.json({register: false});
      });
    }
    else {
      res.json({register: true});
    }
  }
  else {
    User.find({phoneid: req.params.phoneid}, function(err, user) {
      if (err) { return next(err); }
      if (user[0]) {
        res.json({register: true});
      } else {
        req.session.phoneid = req.params.phoneid;
        res.json({register: false});
      }
    });
  }
});

// 'GET returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// query (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
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

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
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

// 'logout' route, logout from passport, and destroy the session with AAD.
router.get('/logout', function(req, res){
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect(config.destroySessionUrl);
  });
});

router.get('/user', function(req, res) {
  if(req.isAuthenticated()) {
    res.json(req.user);
  }
  else {
    res.json({message: "Please log in"});
  }
});

router.get('/isLoggedIn', function(req, res) {
  res.json({isLoggedIn: req.isAuthenticated()});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

module.exports = router;