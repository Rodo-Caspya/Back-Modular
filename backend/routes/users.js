const express = require('express');
const bodyParser =require('body-parser');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate')


var router = express.Router();
router.use(bodyParser.json());


router.post('/signup', (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
        if(req.body.firstname){
          user.firsname = req.body.firsname;
        }
        if(req.body.lastname){
          user.lastname = req.body.lastname;
        }
        if(req.body.email){
            user.email = req.body.email;
        }
        user.save((err,user) => {
            if(err){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
                return;
            }
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Registration Successful!'});
            });
        }); 
    }
  });
}); 

router.post('/login', (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
      if(err){
          return next(err);
      }
      if(!user){
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: false, status: 'Login Unseccessful!', err: info});
      }
      req.login(user,(err) => {
          if(err){
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({success: false, status: 'Login Unseccessful', err: "Could not log in user"});
          }
          var token = authenticate.getToken({_id: req.user._id}); 
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Login Successful',token: token, admin: user.admin}); 
      });
  })(req, res,next);
});

router.get('/consultar', async function consultar (req, res) {
  try{
      const user = await User.find();
      res.statusCode = 200;
      res.json(user);
  }catch{
      res.statusCode = 200;
      // res.status(200).send({Error:"Vacas is not found"});
  }
});

module.exports = router;
