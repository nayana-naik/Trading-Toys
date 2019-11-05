function item(itemCode,itemName,category,description,rating,imageURL){
  // if (!(this instanceof item)) {
  //   return new item(itemCode,itemName,category,description,rating,imageURL);
  // }
  this.itemCode=itemCode;
  this.itemName=itemName;
  this.category=category;
  this.description=description;
  this.rating=rating;
  this.imageURL=imageURL;
};

module.exports=item;

var mongoose=require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var itemSchema = new Schema({
        itemCode:String,
        itemName:String,
        category:String,
        description:String,
        rating:String,
        imageURL:String

},{collection:'item'});

module.exports.itemSchema = mongoose.model('itemModel', itemSchema);

//The JavaScript prototype property allows you to add new properties to object constructors:
// Square.prototype.area = function area() {
//   return Math.pow(this.width, 2);
// };module.exports = Square;

// function categories(category){
//   if (!(this instanceof category)) {
//     return new category(category);
//   }
//   this.category=category;
// };
//
// module.exports=categories;
