
/**
================================================================================================
                                Declarations & Set-up
================================================================================================ 
*/
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'}); // TODO:can also use a global config object in same way as credentials

var rekognition = new AWS.Rekognition();

/**
================================================================================================ 
*/ 


/* This operation deletes a Rekognition collection. */

 var params = {
  CollectionId: "myTestImages"
 };
 rekognition.deleteCollection(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
   /*
   data = {
    StatusCode: 200
   }
   */
 });