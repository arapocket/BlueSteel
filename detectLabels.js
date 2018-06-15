
/**
================================================================================================
                                Declarations & Set-up
================================================================================================ 
*/
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'}); // TODO:can also use a global config onject in same way as credentials

var rekognition = new AWS.Rekognition();

/**
================================================================================================ 
*/ 


var params = {
  Image: { /* required */
    //Bytes: new Buffer('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
    S3Object: {
      Bucket: 'rekog-image-bucket',
      Name: 'IMG_2250.jpg',
      // Version: 'STRING_VALUE'
    }
  },
  MaxLabels: 0,
  MinConfidence: 0.0
};
rekognition.detectLabels(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(JSON.stringify(data));           // successful response
});