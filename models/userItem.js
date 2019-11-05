// function userItem(userItem,rating,status,swapItem,swapItemRating,swapperRating){
//   var userItemObj = {
//           userItem:userItem,
//           rating:rating,
//           status:status,
//           swapItem:swapItem,
//           swapItemRating:swapItemRating,
//           swapperRating:swapperRating
//         };
//       return userItemObj;
// };

// module.exports=userItem;



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userItemSchema = new Schema({
  userID: String,
  userItem: String,
  rating: String,
  status: String,
  swapItem: String,
  swapItemRating: String,
  swapperRating: String

}, { collection: 'userItems' });

module.exports = mongoose.model('userItemsModel', userItemSchema);