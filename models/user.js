function user(userID,firstName,lastName,emailAddress,address1Field,address2Field,city,state,zip,country){
  var userObj = {
            userID:userID,
            firstName:firstName,
            lastName:lastName,
            emailAddress:emailAddress,
            address1Field:address1Field,
            address2Field:address2Field,
            city:city,
            state:state,
            zip:zip,
            country:country};
      return userObj;


};

module.exports=user;
