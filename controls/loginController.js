var express=require('express');
var item=require(__dirname+'/../models/item');
var itemDB=require(__dirname+'/../models/itemDB');
var user=require(__dirname+'/../models/user');
var userDB=require(__dirname+'/../models/userDB');
var path=require('path');
var app=module.exports=express();
var bodyParser=require('body-parser');
var session=require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cookieParser = require('cookie-parser');
app.set('view engine','ejs');
app.use('/resources', express.static(path.join(__dirname, '/../resources')));
app.use(session({name:'HW3', secret: "HW3!"}));

app.use(cookieParser());
//var validator = require('express-validator');
var validator=require('validator');
//app.use(validator);

/* Mongo DB Connection*/
/* Mongo DB Connection*/
var mongoose = require('mongoose');
var db = require('./dbControls').db;
var User=mongoose.model("userModel");
var Item = mongoose.model("itemModel");
var UserProfile = mongoose.model("userProfileModel");
var UserItem = mongoose.model("userItemsModel");

console.log("Inside Login Controller");
app.get('/login',function(req,res){
      console.log('/login get');
        var userInfo=req.session.theUser;
      if(req.session.theUser){
        console.log("/login get If Session present condition " + userInfo.firstName);
        //res.render('welcome',{userFirstName:userInfo.firstName,loginFlag:true})
        res.redirect('/myItems');
      }
      else
      {
          console.log('/login get Else Condition when session not present '+userInfo);
          res.render('sign-in',{welcomeText:'',loginFlag:false});
      }

});

app.post('/login',urlencodedParser,function(req,res){
      console.log('/Login POST REQUEST');
    
   // req.checkBody('userID').isEmpty();
    //req.checkBody('password').isEmpty();
    if(validator.isEmpty(req.body.userID)||validator.isEmpty(req.body.password)){
      res.render('sign-in', { welcomeText:'Username or Password cannot be empty', loginFlag: false });
    }
    

    
      else {//Login success
        
        userDB.getUserInfoById(req.body.userID).then(docs => {

          console.log("*************************************************")
          console.log("Login is successfull! Mongo DB First Name:" + docs.firstName);
          req.session.theUser = docs;
          console.log("Logged in User information "+req.session.theUser);
          var salt = docs.salt;
          var hash = docs.hash;
          console.log(docs);

          if (userDB.validatePassword(req.body.password, salt, hash)) {

            console.log("Password matched");
            res.redirect('/myItems');

          }
          else {
            console.log("Password do not match");
            res.render('sign-in', { welcomeText: 'Password is incorrect', loginFlag: false });
          }
        })
        .catch(err => {
          //console.log(err);
          res.render('sign-in', { welcomeText: 'Username not found', loginFlag: false });
        });
 }
   
});

app.get('/logout',function(req,res){

  console.log("Session Destroyed when /logout clicked");

  req.session.destroy();
      
      res.render('sign-in',{welcomeText:'',loginFlag:false});
});

app.get('/register',function(req,res){
  res.render('register',{loginFlag:false});
})

app.post('/register',function(req,res){
  res.redirect('/index');
});