// This criterion is linked to a Learning Outcome User DB file
// Hardcoded DB file, like the ItemDB, that has at least one hard-coded user object, a method to return a list of user objects, and a method to get a user's profile.
var crypto = require('crypto');
var user=require('./user.js');
var userProfile=require('./userProfile.js');
var UserItem=require('./userItem.js');
var offers=require('./offers.js');

var mongoose=require('mongoose');
var db = require(__dirname + '/../controls/dbControls').db;

var User=require('./userModelMongoose');
mongoose.model("userModel");
mongoose.model("userItemsModel");
var OfferModel = mongoose.model("offerModel");

function getUserInfoById(userID){

return new Promise((resolve,reject)=>{
  User.findOne({ userID: userID }).then(docs =>{
  //console.log(docs);
  resolve(docs);
}).catch(err=>{return reject(err);})

})

};
module.exports.getUserInfoById = getUserInfoById;

function getUserItems(userID){
  return new Promise((resolve,reject)=>{
    UserItem.find({userID:userID}).then(docs=>{
     // console.log(docs);
      resolve(docs);

    }).catch(err=>{
      return reject(err);
    })
  })
}
module.exports.getUserItems=getUserItems;
//getUserItems('A1');

function getAllUserItems(){
  return new Promise((resolve, reject) => {
    UserItem.find().then(docs => {
      // console.log(docs);
      resolve(docs);

    }).catch(err => {
      return reject(err);
    })
  })
}

module.exports.getAllUserItems=getAllUserItems;
function getUserItemByUserIdAndItemName(userID,itemName){
  return new Promise((resolve, reject) => {
    UserItem.findOne({ userID:userID ,userItem:itemName}).then(docs => {
       //console.log(docs);
      resolve(docs);

    }).catch(err => {
      return reject(err);
    })
  });
}
module.exports.getUserItemByUserIdAndItemName=getUserItemByUserIdAndItemName;
//getUserItemByUserIdAndItemName('A1','Ruby Rubik Cube');

function generateSalt() {
  // creating a unique salt for a particular user 
  this.salt = crypto.randomBytes(16).toString('hex');
  console.log("----SALT Generated----");
  console.log(this.salt);
  return this.salt;

}
//var salt=generateSalt();
function generateHash(password, salt) {
  // hashing user's salt and password with 1000 iterations, 
  //64 length and sha512 digest
  this.hash = crypto.pbkdf2Sync(password, this.salt,
    1000, 64, `sha512`).toString(`hex`);
  console.log("-----HASH Generated----");
  console.log(this.hash);
  return this.hash;
}
module.exports.generateSalt = generateSalt;
module.exports.generateHash = generateHash;
validatePassword = function (password, salt, hash) {
  var hashCheck = crypto.pbkdf2Sync(password,
    salt, 1000, 64, `sha512`).toString(`hex`);
  if (hashCheck === hash) {
    return true;
  }
  else {
    return false;
  };
};

module.exports.validatePassword = validatePassword;

function getSavedItems(userID){
  return new Promise((resolve, reject) => {
    OfferModel.find({userID:userID}).then(docs => {
        resolve(docs);
      

    }).catch(err => {
      return reject(err);
    })
  });
}
module.exports.getSavedItems = getSavedItems;

//getSavedItems("A4");

