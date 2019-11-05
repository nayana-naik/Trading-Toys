var express=require('express');
var item=require(__dirname+'/../models/item');
var itemDB=require(__dirname+'/../models/itemDB');
var user = require(__dirname + '/../models/user');
var userDB = require(__dirname + '/../models/userDB');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');
var session=require('express-session');
var cookieParser = require('cookie-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine','ejs');
app.use('/resources', express.static(path.join(__dirname, '/../resources')));
var loginController=require(path.join(__dirname+'/loginController'));
app.use(loginController);
var profileController=require(path.join(__dirname+'/profileController'));
app.use(profileController);
var itemController=require(path.join(__dirname+'/itemController'));
app.use(itemController);
var actionController = require(path.join(__dirname + '/actionController'));
app.use(actionController);
//app.use(redirectUnmatched); 


//
// /* Gets all items from itemDB */
// var allItems=itemDB.getItems();
// /* Gets Item-Category in array form from itemDB */
// var itemCat=itemDB.getItemCategory();
// /*Gets unique Category from itemDB */
// var uniqueCat=itemDB.getUniqueCategory();

/* Mongo DB Connection*/
var mongoose=require('mongoose');
var db=require('./dbControls').db;
var UserProfile = mongoose.model("userProfileModel");
var User = mongoose.model("userModel");
var Item = mongoose.model("itemModel");
var UserItem = mongoose.model("userItemsModel");
var Offers = mongoose.model("offerModel");

app.use(session({name:'HW3', secret: "HW3!"}));
app.use(session({ name: 'myItems', secret: "myItems" }));
app.use(cookieParser());

app.get('/',function(req,res){

    if(req.session.theUser){
    
      res.render(__dirname+'/../views/index',{userFirstName:req.session.theUser.firstName,loginFlag:true});
    }
    else{
      res.render(__dirname+'/../views/index',{loginFlag:false});
    }


});





app.get('/index',function(req,res){

    if(req.session.theUser){
    //{userFirstName:userInfo.firstName,loginFlag:true}
      res.render(__dirname+'/../views/index',{userFirstName:req.session.theUser.firstName,loginFlag:true});
    }
    else{
      res.render(__dirname+'/../views/index',{loginFlag:false});
    }


});


app.get('/about',function(req,res){
    if(req.session.theUser){
      res.render(__dirname+'/../views/about',{userFirstName:req.session.theUser.firstName,loginFlag:true});
  }
  else{
      res.render(__dirname+'/../views/about',{loginFlag:false});
  }

});

app.get('/contact',function(req,res){
  if(req.session.theUser){
  res.render(__dirname+'/../views/contact',{userFirstName:req.session.theUser.firstName,loginFlag:true});
  }
  else {
    res.render(__dirname+'/../views/contact',{loginFlag:false});
  }
});






app.get('/mySwaps',function(req,res){

  if(req.session.theUser){  
    


    

    var mySwapEligible;


    userDB.getAllUserItems().then(docs=>{
      //Offers.find({userID:req.session.theUser.userID,itemStatus:"Pending"}).then(docs=>{
      console.log("----------------------------------------------");
      //console.log("IN /mySwaps");
     // console.log(docs.length);
      //console.log('DOCS COntent');
       // console.log(docs);
        
        res.render(__dirname + '/../views/mySwaps', { userFirstName: req.session.theUser.firstName, loginFlag: true, mySwapsDetails: docs });
     
     

    }).catch(err=>{
      //console.log(err);
      res.render(__dirname + '/../views/mySwaps', { userFirstName: req.session.theUser.firstName, loginFlag: true, mySwapsDetails:null });
    });
  
  }
else {
    res.render('sign-in',{welcomeText:'',loginFlag:false});
  }
});



app.listen(3000);
