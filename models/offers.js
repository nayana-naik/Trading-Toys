
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require(__dirname + '/../controls/dbControls').db;
// create a schema
var offerSchema = new Schema({
    
    userID: String,
    itemCodeOwn:String,
    itemCodeWant:String,
    itemStatus: String,
    itemUserId:String
    

}, { collection: 'offers' });

module.exports = mongoose.model('offerModel', offerSchema);



//OfferModel.find().then(docs=>{console.log(docs)});