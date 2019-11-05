var express = require('express');
var item = require(__dirname + '/../models/item');
var itemDB = require(__dirname + '/../models/itemDB');
var user = require(__dirname + '/../models/user');
var userDB = require(__dirname + '/../models/userDB');
var userProfile = require(__dirname + '/../models/userProfile');
var path = require('path');
var app = module.exports = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.use('/resources', express.static(path.join(__dirname, '/../resources')));
app.use(session({ name: 'HW3', secret: "HW3!" }));

app.use(cookieParser());

/*MongoDB Connection and Schema Def */
var mongoose = require('mongoose');
var db = require('./dbControls').db;
var UserProfile = mongoose.model("userProfileModel");
var User = mongoose.model("userModel");
var Item = mongoose.model("itemModel");
var UserItem = mongoose.model("userItemsModel");
var Offers = mongoose.model("offerModel");

app.get('/update',function(req,res){
    
    if (req.session.theUser){
        console.log(req.url);
        console.log(req.query.itemCode);
        
       // userDB.getUserItemByUserIdAndItemName(req.session.theUser.userID,req.query.itemName).then(docs => {
            Offers.find({userID:req.session.theUser.userID,itemCodeOwn:req.query.itemCode}).then(docs=>{
               //// console.log(docs);
                console.log(docs[0].itemStatus);
            if(docs[0].itemStatus==='Available'||docs[0].itemStatus==='Swapped'){
console.log("&*()(*&^%^&*()");
                        res.redirect('/item?itemCode='+docs[0].itemCodeOwn);
                   
            }

            else if(docs[0].itemStatus==='Pending'){
                //console.log(docs);
                //res.render(__dirname + '/../views/mySwaps', { userFirstName: req.session.theUser.firstName, loginFlag: true });
                res.redirect('/mySwaps');
            }
            else{
                //console.log("*************");
                res.redirect('/myItems');
            }

            
        }).catch(err => {
           // console.log(err);
            res.redirect('/myItems');
        });
       // res.send('in update' + req.url);
    }
    else{
        res.render('sign-in', { welcomeText: '', loginFlag: false });
    }

});


app.get('/accept',function(req,res){

console.log(req.url);
console.log(req.query);
if(req.session.theUser){
    UserItem.findOneAndUpdate({userID:req.session.theUser.userID,userItem:req.query.itemName},{$set:{status:"Swapped"}},{new:true}).then((data)=>{
       //// console.log("/Accept "+data);
       // res.send(data);
        res.redirect('/myItems');
    },(error)=>{
       // console.log(error);
        res.redirect('/myItems');
    }
    )
}
else{
    res.render('sign-in', { welcomeText: '', loginFlag: false });
}



});


app.get(('/reject'||'/withdraw'),function(req,res){
    console.log(req.url);
    console.log(req.query);
    if (req.session.theUser) {
        UserItem.findOneAndUpdate({ userID: req.session.theUser.userID, userItem: req.query.itemName }, { $set: { status: "Available",swapItem:"" } }, { new: true }).then((data) => {
           // console.log(req.url + data);
            // res.send(data);
            res.redirect('/myItems');
        }, (error) => {
           // console.log(error);
            res.redirect('/myItems');
        }
        )
    }
    else {
        res.render('sign-in', { welcomeText: '', loginFlag: false });
    }


})

app.get('/swap', function (req, res) {

    if (req.session.theUser) {
        console.log(req.url);
        console.log(req.query.itemCode);


        Item.find({ itemCode: req.query.itemCode }, function (err, itemObj) {
            
                res.render(__dirname + '/../views/swap', { item: itemObj, userFirstName: req.session.theUser.firstName, loginFlag: true });

               // console.log(itemObj[0].itemName);
            
        })
       // res.send('/swap');

    }
    else {
        res.render('sign-in', { welcomeText: '', loginFlag: false });
    }


});

app.get('/delete',function(req,res){
    if(req.session.theUser){
        Offers.findOneAndRemove({ userID: req.session.theUser.userID, itemCodeOwn: req.query.itemCode },{new:true}).then(docs=>{
            
            res.redirect('/myItems');

        }).catch(error=>{
            //console.log(error);
            res.redirect('/myItems');
        })
    }
    else{
        res.render('sign-in', { welcomeText: '', loginFlag: false });
    }
   
})
