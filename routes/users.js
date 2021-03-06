var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');

var Order = require('../modules/order');
var Cart = require('../modules/cart');
router.use(csrfProtection);

router.get('/', function(req, res, next) {
  
    res.render('signin', { title: 'Shopping Cart'});

});

router.get('/profile',isLoggedIn,function(req,res,next){
    Order.find({user: req.user}, function(err, orders){
        if(err)
        {
          return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('profile',{ title: 'Shopping Cart',orders: orders});
    });
});

router.get('/login/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/login/google/callback', 
  passport.authenticate('google',{ successRedirect: '/users/profile',
  failureRedirect: '/' }));

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/login/facebook/callback', 
  passport.authenticate('facebook',{ successRedirect: '/users/profile',
  failureRedirect: '/' }));

router.get('/logout',isLoggedIn,function(req,res,next){
  req.logOut();
  res.redirect('/');
});

router.use('/',notLoggedIn,function(req,res,next){
    next();
});
/* GET users listing. */

router.get('/signup',function(req,res,next){

  var messages = req.flash('error');
  res.render('signup',{ title: 'Shopping Cart', csrfToken: req.csrfToken(),messages:messages,
              hashErrors : messages.length >0});
});

router.post('/signup',passport.authenticate('local.signup',{
  failureRedirect: '/users/signup',
  failureFlash: true
}),function(req,res,next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else{
    res.redirect('/users/profile');
  }
});

router.get('/signin',function(req,res,next){
  var messages = req.flash('error');
  res.render('signin',{ title: 'Shopping Cart', csrfToken: req.csrfToken(),messages:messages,
              hashErrors : messages.length >0});
});

router.post('/signin',passport.authenticate('local.signin',{
    failureRedirect: '/users/signin',
    failureFlash: true
}),function(req,res,next){
    if(req.session.oldUrl){
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    }else{
      res.redirect('/users/profile');
    }
});

module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
