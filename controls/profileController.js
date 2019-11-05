var express=require('express');
var item=require(__dirname+'/../models/item');
var itemDB=require(__dirname+'/../models/itemDB');
var user=require(__dirname+'/../models/user');
var userDB=require(__dirname+'/../models/userDB');
var userProfile=require(__dirname+'/../models/userProfile');
var offers = require(__dirname + '/../models/offers');
var path=require('path');
var app=module.exports=express();
var bodyParser=require('body-parser');
var session=require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cookieParser = require('cookie-parser');
app.set('view engine','ejs');
app.use('/resources', express.static(path.join(__dirname, '/../resources')));
app.use(session({name:'HW3', secret: "HW3!"}));
app.use(session({name:'myItems',secret:"myItems"}));
app.use(cookieParser());

/*MongoDB Connection and Schema Def */
var mongoose = require('mongoose');
var db = require('./dbControls').db;
var UserProfile = mongoose.model("userProfileModel");
var User = mongoose.model("userModel");
var Item = mongoose.model("itemModel");
var Offers = mongoose.model("offerModel");


app.get('/myItems',function(req,res){

  if(req.session.theUser){
    //#region old code
    // userProfile.getUserProfile(req.session.theUser.userID).then(docs=>{
    //   console.log("/myItems My Items of User "+req.session.theUser.userID+" are ");
    //   console.log(docs);
    //   req.session.userProfile=docs;
    //   console.log("************************************************");
    //   console.log(req.session.userProfile);
    //   console.log(docs.userItems.length+" Length of userItems in userProfile");

      
    //   if (docs.userItems){
    //        if (docs.userItems.length > 0){
    //         console.log("If Condition Length of userItems " + docs.userItems.length);
    //         req.session.mySwapEligible=true;
    //         return res.render(__dirname + '/../views/myItems', { userFirstName: req.session.theUser.firstName, loginFlag: true, userProfileItems: docs, categoryOfItem: null });///***to change */
              


     
    //   }
    //     else {//For user with no items
    //       console.log("Else Condition Length of userItems " + docs.userItems.length)
    //       return res.render(__dirname + '/../views/myItems', { userFirstName: req.session.theUser.firstName, loginFlag: true, userProfileItems: null,categoryOfItem:null });
    //          req.session.mySwapEligible = false;
    //     }
    // }  
      
    //   else{//For user with no items
    //     console.log("Else Condition 2 Length of userItems " + docs.userItems.length)
    //     return res.render(__dirname + '/../views/myItems', { userFirstName: req.session.theUser.firstName, loginFlag: true, userProfileItems: null,categoryOfItem:null });
    //     req.session.mySwapEligible = false;
    //   }

      

    // }).catch(err=>{
    //   console.log("Error occurred in /myItems "+err);
    //   res.render(__dirname + '/../views/myItems', { userFirstName: req.session.theUser.firstName, loginFlag: true, userProfileItems: null,categoryOfItem:null});
    // });
//#endregion

    let itemCodes=[];

   
userDB.getSavedItems(req.session.theUser.userID).then(docs=>{
    var sessionData=req.session;
        sessionData.currentProfile = docs;
        if(docs.length>0){
          for(var i=0;i<docs.length;i++){
            itemCodes[i] = docs[i].itemCodeOwn;
            
            //console.log(itemCodes[i]);

          }
          //console.log(itemCodes);
          Item.find({itemCode:itemCodes}).then(doc => {
           // console.log(doc);
            return res.render(__dirname + '/../views/myItems', { userFirstName: req.session.theUser.firstName, loginFlag: true, userProfileItems: doc});
          });
        }
        else{
          return res.render(__dirname + '/../views/myItems', { userFirstName: req.session.theUser.firstName, loginFlag: true, userProfileItems: null});
        }
        
        

        

      }).catch(error=>{
        console.log(error);
      });  
      
      console.log("/myItems Session currentProfile ");
      console.log(req.session.currentProfile);

  }
  else  //When a user is not signed in
  {
    res.render('sign-in', { welcomeText: '', loginFlag: false });
  }

  
});
