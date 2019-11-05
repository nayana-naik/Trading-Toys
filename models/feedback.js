var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require(__dirname + '/../controls/dbControls').db;
// create a schema
var feedbackSchema = new Schema({
    //userID,firstName,lastName,emailAddress,address1Field,address2Field,city,state,zip,country
    userID1: String,
    userID2: String,
    itemCode: String,
    offerID:String,
    rating:String

}, { collection: 'feedback' });

module.exports = mongoose.model('feedbackModel', userProfileSchema);