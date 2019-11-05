var item=require('./item.js');
var mongoose = require('mongoose');
var db = require(__dirname + '/../controls/dbControls').db;

var Item = mongoose.model("itemModel");

function getItemsAndCategories(){
Item.find({}).select({ itemCode: 1, itemName: 1, category: 1  }).then(doc=>{
    console.log(doc);
    });
}


function getItem(itemCode){
    return new Promise((resolve, reject) => {
        Item.find({itemCode:itemCode}).then(docs => {
            resolve(docs);
            //console.log("&&&&&&&&&&&&&&&");
             //console.log(docs[0].itemName);
            

        }).catch(err => {
            //console.log(err);
            return reject(err);
        })
    })
}
//getItem("11AA");
module.exports.getItem=getItem;

function getCategoryOfItem(itemName){
    
    return new Promise((resolve,reject)=>{
        Item.find({itemName}).select({ itemCode: 1, itemName: 1, category: 1 }).then(doc => {
            //  for(var i=0; i<doc.length;i++){
            //     // console.log(doc[i].category);
            //     resolve(doc[i].category);
            //  }
             resolve(doc);
            //console.log(doc.category);
            //console.log(doc[0].category);

            //resolve(doc);

        }).catch(err=>{
            return reject(err);
        });


    })
    
}
//getCategoryOfItem(['Andy Alphabetic puzzle']);
//getCategoryOfItem(['Andy Alphabetic puzzle','Ruby Rubik Cube','G I Joe']);

module.exports.getItemsAndCategories=getItemsAndCategories;
module.exports.getCategoryOfItem=getCategoryOfItem;

function getItemByCategory(categoryName){
    return new Promise((resolve,reject)=>{
        Item.find({category:categoryName}).then(doc=>{
            resolve(doc);
            //console.log(doc);
        }).catch(err=>{
            return reject(err);
        })
    })
}
module.exports.getItemByCategory=getItemByCategory;
//getItemByCategory('Puzzle');
