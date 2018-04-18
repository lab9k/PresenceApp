var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
var io = require('../middleware/io');

let Location = mongoose.model('Location');
let User = mongoose.model('User');
let Campus = mongoose.model('Campus');
let Segment = mongoose.model('Segment');
let Message = mongoose.model('Message');

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
  socket.on('checkout', function (data) {
    console.log(data);
    io.emit('new-checkout', { user: data });
  });
});

/* CREATE CHECKIN */
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
          return res.status(400).json({message: 'Location has no name.'});
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
  let campus = new Campus({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    isLunch: req.body.isLunch,
    isThuiswerk: req.body.isThuiswerk,
    segments: req.body.segments,
  });
  campus.save(function(err, camp) {
    if(err) { return next(err);}
    res.json(camp);
  })
});

/* CREATE SEGMENT */
router.post('/API/segment/', function(req, res, next) {
  let segment = new Segment({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    isVergadering: req.body.isVergadering,
    locations: req.body.locations,
  });
  segment.save(function(err, seg) {
    if(err) { return next(err);}
    res.json(seg);
  })
});

/* CREATE LOCATION */
router.post('/API/location/', function(req, res, next) {
  let location = new Location({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    stickers: req.body.stickers,
    doNotDisturb: req.body.doNotDisturb,
  });
  location.save(function(err, loc) {
    if(err) { return next(err);}
    res.json(loc);
  })
});

/* CREATE MESSAGE */
router.post('/API/message/', function(req, res, next) {
  let message = new Message({
    _id: mongoose.Types.ObjectId(),
    sender: req.body.sender,
    subject: req.body.subject,
    content: req.body.content,
    isRead: req.body.isRead
  });
  message.save(function(err, mess) {
    if(err) { return next(err);}
    res.json(message);
  })
});

/* UPDATE USER */
router.put('/API/user/', function(req, res, next) {
  console.log("USER:" + req.body.phoneid);
  User.findByIdAndUpdate(req.body._id, req.body, function (err, user) {
    if (err) { 
      console.log(err);
      return next(err); 
    }
    console.log("RESULT:" + user);
    res.json(user);
  })
});

/* UPDATE USER PHONEID */
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

/* UPDATE MESSAGE */
router.put('/API/message', function(req, res, next) {
  Message.findByIdAndUpdate(req.body._id, req.body, function (err, message) {
    if (err) { 
      console.log(err);
      return next(err); 
    }
    console.log("RESULT:" + message);
    res.json(message);
  })
});

/* UPDATE CAMPUS */
router.put('/API/campus/', function(req, res, next) {
  Campus.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .populate('segments').exec(function (err, campus) {
      if (err) { return next(err); }
      console.log(campus);
      res.json(campus);
  })
});

/* UPDATE SEGMENT */
router.put('/API/segment/', function(req, res, next) {
  console.log(req.body);
  Segment.findByIdAndUpdate(req.body._id, req.body, {new: true}, function (err, segment) {
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
        isLunch: {$first: "$isLunch"},
        isThuiswerk: {$first: "$isThuiswerk"},
        segments: { $push: {
          _id: {$arrayElemAt:["$segment._id", 0]},
          name: {$arrayElemAt:["$segment.name", 0]},
          isVergadering: {$arrayElemAt:["$segment.isVergadering", 0]},
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
  let time;
  if (!req.query['hours']) {
    time = +new Date() - 1000 * 60 * 60 * 24;
  } 
  else {
    time = +new Date() - 1000 * 60 * 60 * req.query['hours'];
  }
  
  User.find(
      {'checkin.time': {$gt: time}},
    ).populate('checkin.location').exec(function(err, users) {
    if (err) { return next(err); }
    res.json(users);
  });
});

/* GET USER BY ID */
router.get('/API/user/:id', function(req, res, next) {
  User.findById(req.params.id).populate('checkin.location').exec(function(err, user) {
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

/* GET USER WITH PHONEID */
router.get('/API/user/phoneid/:phoneid', function(req, res, next) {
  User.find({$match: {phoneid: req.params.phoneid}})
  .populate('messages', 'checkin.time')
  .exec(function(err, user) {
    if (err) {next(err);}
    if (user) {
      res.json(user);
    } else {
      res.status(400).json({message: "User not found."});
    } 
  });
});

/* DELETE CHECKIN */
router.delete('/API/checkin/:id', function(req, res, next) {
  if(!req.params.id) {
    return res.status(400).json(
      {message: 'Missing fields'}
    );
  }
  
  User.findById(req.params.id, function(err, user) {
    user.checkin = null;
    user.save(function(err, usr) {
      if (err) { return next(err); }
      res.json(usr);
    })
  });

});

/* DELETE CAMPUS */
router.delete('/API/campus/:id', function(req, res, next) {
  if(!req.params.id) {
    res.status(400).json({message: "enter id"});
  }
  Campus.remove({_id: req.params.id}, function(err) {
    if(!err) {
      res.json({removed: true});
    }
    else {
      res.json({removed: false});
    }
  });
});

/* DELETE SEGMENT */
router.delete('/API/segment/:id', function(req, res, next) {
  if(!req.params.id) {
    res.status(400).json({message: "enter id"});
  }
  //Find campus with this segment and update it
  Campus.findOneAndUpdate({segments: {"$in": [req.params.id]}},
     { $pull: {segments: { $in: [req.params.id]}}}, {new: true},
    function(err, campus) {
      if(err) { return next(err);}
      Segment.remove({_id: req.params.id}, function(err) {
        if(!err) {
          res.json({removed: true});
        }
        else {
          res.json({removed: false});
        }
      });
  });
});

/* DELETE LOCATION */
router.delete('/API/location/:id', function(req, res, next) {
  if(!req.params.id) {
    res.status(400).json({message: "enter id"});
  }
  //Find segment with this location and update it
  Segment.findOneAndUpdate({locations: {"$in": [req.params.id]}},
     { $pull: {locations: { $in: [req.params.id]}}}, {new: true},
    function(err, segment) {
      if(err) { return next(err);}
      Location.remove({_id: req.params.id}, function(err) {
        if(!err) {
          res.json({removed: true});
        }
        else {
          res.json({removed: false});
        }
      });
  });
});

// TODO: TRY TO MOVE TO UPDATE USER
/* DELETE PHONEID */
router.put('/API/user/removephoneid', function(req, res, next) {
  console.log("USER:" + req.body.phoneid);
  User.findByIdAndUpdate(req.body._id, { "$unset": { "phoneid": 1 } }, function (err, user) {
    if (err) { 
      console.log(err);
      return next(err); 
    }
    console.log("RESULT:" + user);
    res.json(user);
  })
});

module.exports = router;