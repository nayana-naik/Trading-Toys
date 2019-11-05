//#region 
//removeUserItem(Item), getUserItems(), and emptyProfile()].
//userID,firstName,lastName,emailAddress,address1Field,address2Field,city,state,zip,country
//var user=require('./user.js');
// userItem,rating,status,swapItem,swapItemRating,swapperRating
//var userItem=require('./userItem.js');
//var userDB=require('./userDB.js');

// function userProfile(userID, userItem){
//   this.userID=userID;
//   this.userItem=userItem;
// };



// function removeUserItem(item){

// };
// function getUserItems(){

// };

// function emptyProfile(){

// };
//#endregion

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require(__dirname + '/../controls/dbControls').db;
// create a schema
var userProfileSchema = new Schema({
  //userID,firstName,lastName,emailAddress,address1Field,address2Field,city,state,zip,country
  userID: String,
  userItems:[String]

}, { collection: 'userProfile' });

module.exports = mongoose.model('userProfileModel', userProfileSchema);

var UserProfile = mongoose.model("userProfileModel");



function getUserProfile(userID){

  return new Promise((resolve, reject) => {
    UserProfile.findOne({ userID: userID }).then(docs => {
      // console.log("USER Profile.JS Docs Data ")
      // console.log(docs);
      // console.log("USER ITEMS");

      // console.log(docs.userItems);
      // console.log("USER PROFILE DOCS LENGTH ");
      // console.log(docs.userItems.length);
      resolve(docs);
    }).catch(err => { 
     // console.log(err);
      return reject(err); })

  });

  
};
//getUserProfile('A2');

module.exports.getUserProfile=getUserProfile;
function getUserItemsByUser(userID){
// for (var i = 0; i < userProfilesDB.length; i++) {
//         if(userProfilesDB[i].userID === userID)
//         {
//             return userProfilesDB[i].userItems;
//         }
//     }
//     return "User Items Not Found";
};
