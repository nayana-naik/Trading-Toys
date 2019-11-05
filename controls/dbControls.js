var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ToyExchange');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('We are connected-dbControls.JS');
});

module.exports.db=db;