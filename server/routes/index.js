var express = require('express');
var router = express.Router();

let hobby = require('../model/hobby');

const passport = require('passport');
let DB = require('../config/db');
let userModel = require('../model/user');
let User = userModel.User;


/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const hobbyList = await hobby.find();  
    res.render('Hobby/list', {
      title: 'Hobby',
      hobbyList: hobbyList, 
      displayName: req.user?req.user.displayName:""
    });
  } catch (err) {
    console.error(err);
    next(err); 
  }
});

// Get method for login
router.get('/login', function(req,res,next){
  if(!req.user)
  {
    res.render('auth/login',
      {
      title:'Login',
      message: req.flash('loginMessage')
      }
    )
  }
  else
  {
    return res.redirect("/")
  }
});


// Post method for login
router.post('/login', function(req,res,next){
  passport.authenticate('local',(err,user,info)=>{
    if(err)
    {
      return next(err);
    }
    if(!user)
    {
      req.flash('loginMessage','AuthenticationError');
      return res.redirect('/login');
    }
    req.login(user,(err)=>{
    if(err)
    {
      return next(err);
    }
    return res.redirect("/")
    })
  })(req,res,next)
});


// Get method for register
router.get('/register', function(req,res,next){
  if(!req.user)
  {
    res.render('auth/register',
      {
      title:'Register',
      message: req.flash('registerMessage')
      }


    )
  }
  else
  {
    return res.redirect("/")
  }
});


// Post method for register
router.post('/register', function(req,res,next){
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password,
    email:req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password, (err)=>{
    if(err)
    {
      console.log("Error:Inserting the new user");
      if(err.name=="UserExistsError")
      {
        req.flash('registerMessage','Registration Error:User already Exist');
      }
      return res.render('auth/register',
        {
          title:'Register',
          message:req.flash('registerMessage')
        }
      )
    }
    else{
      return passport.authenticate('local')(req,res,()=>{
        res.redirect("/");
      })
    }
  })
});
router.get('/logout',function(req,res,next){
req.logout(function(err)
{
  if(err)
  {
    return next(err)
  }
})
res.redirect("/");
})


/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About',
    displayName: req.user?req.user.displayName:""
  });

});

/* GET contact us page. */
router.get('/contact', function(req, res, next)  {
  res.render('contact', { title: 'Contact' ,
    displayName: req.user?req.user.displayName:""
  });

});

module.exports = router;

