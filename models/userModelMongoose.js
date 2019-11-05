var mongoose=require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    //userID,firstName,lastName,emailAddress,address1Field,address2Field,city,state,zip,country
    userID: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    address1Field: String,
    address2Field: String,
    city: String,
    state: String,
    zip:String,
    country: String,
    salt:String,
    hash:String

},{collection:'users'});

module.exports = mongoose.model('userModel', userSchema);
