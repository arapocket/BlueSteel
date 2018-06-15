
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


var params = {
  CollectionId: 'myTestImages', /* required */
  MaxResults: 20,
  //NextToken: 'STRING_VALUE'
};
rekognition.listFaces(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(JSON.stringify(data));    console.log(JSON.stringify("Number of Faces: "+ data.Faces.length))       // successful response
});