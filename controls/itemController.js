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
/* Mongo DB Connection*/
/* Mongo DB Connection*/
var mongoose = require('mongoose');
var db = require('./dbControls').db;
var User = mongoose.model("userModel");
var UserProfile = mongoose.model("userProfileModel");
var Item=mongoose.model("itemModel");
var validator = require('validator');
app.get('/categories',function(req,res){
  

Item.find().distinct("category",function(err,categoryItem){
  if(err){
      //console.log("Error"+err);
    }
    else {
      {
        var uniqueCat=categoryItem;
        console.log(uniqueCat);
        Item.find().distinct("itemName",function(err,itemName){
          var itemsList=itemName;

          Item.find().distinct("itemCode",function(err,itemCode){
            if(req.session.theUser){

              if (req.url === '/categories' || validator.isEmpty((require('url').parse(req.url).query).slice(17)) || validator.isEmpty(require('url').parse(req.url).query)){

                     res.render(__dirname+'/../views/categories',{itemCode:itemCode,itemsList:itemsList,catalogueCategory:uniqueCat,userFirstName:req.session.theUser.firstName,loginFlag:true});
                  }
                 else{

                  res.render(__dirname+'/../views/categories',{itemCode:itemCode,itemsList:itemsList,catalogueCategory:uniqueCat,userFirstName:req.session.theUser.firstName,loginFlag:true});

                //res.redirect('/category?catalogueCategory='+);

                   }
              }
              else{

              if (req.url === '/categories' || validator.isEmpty((require('url').parse(req.url).query).slice(17)) || validator.isEmpty(require('url').parse(req.url).query)){

                   res.render('sign-in',{welcomeText:'',loginFlag:false});
                }
               else{

                res.render('sign-in',{welcomeText:'',loginFlag:false});
                 }


              }
          })



        })



      }
    }
});

});


// app.get('/category',function(req,res){


//   if (req.session.theUser) {

   
//     res.send('in /category'+req.query+req.url);
    
//   }
    
  
//   else {
//     res.render(__dirname + '/../views/sign-in', { loginFlag: false });
//   }
// })






 app.get('/item',function(req,res){

   if (req.session.theUser) {
    //  console.log(require('url').parse(req.url).query);
    //  var itemCodeQueryString = require('url').parse(req.url).query;
    //  var code=itemCodeQueryString.slice(9);
    //  console.log(code);
     if (validator.isEmpty(require('url').parse(req.url).query) || validator.isEmpty((require('url').parse(req.url).query).slice(9))){

    
     //if (Object.keys(req.query.itemCode).length === 0 || Object.keys(req.query).length === 0){
       res.redirect('/categories');
     }
     else{
       Item.find({ itemCode: req.query.itemCode }, function (err, itemObj) {
        if(itemObj.length>0){
          res.render(__dirname + '/../views/item', { item: itemObj, userFirstName: req.session.theUser.firstName, loginFlag: true });
        }
        else{
          res.redirect('/categories');
        }
         

         //console.log(itemObj[0].itemName);
       });
     }

}
else {
    res.render('sign-in', { welcomeText: '', loginFlag: false });

  }
});
