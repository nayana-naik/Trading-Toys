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

module.exports = mongoose.model('itemModel', itemSchema);
