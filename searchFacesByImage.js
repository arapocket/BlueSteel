
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

/* This operation searches for faces in a Rekognition collection that match the largest face in an S3 bucket stored image. */

var params = {
  CollectionId: "myTestImages", 
  FaceMatchThreshold: 80, 
  Image: {
    
   S3Object: {
    Bucket: "rekog-image-bucket", 
    Name: "IMG_2295.jpg"
   }
  }, 
  MaxFaces: 5
 };
 rekognition.searchFacesByImage(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(JSON.stringify(data));           // successful response
   /*
   data = {
    FaceMatches: [
       {
      Face: {
       BoundingBox: {
        Height: 0.3234420120716095, 
        Left: 0.3233329951763153, 
        Top: 0.5, 
        Width: 0.24222199618816376
       }, 
       Confidence: 99.99829864501953, 
       FaceId: "38271d79-7bc2-5efb-b752-398a8d575b85", 
       ImageId: "d5631190-d039-54e4-b267-abd22c8647c5"
      }, 
      Similarity: 99.97036743164062
     }
    ], 
    SearchedFaceBoundingBox: {
     Height: 0.33481481671333313, 
     Left: 0.31888890266418457, 
     Top: 0.4933333396911621, 
     Width: 0.25
    }, 
    SearchedFaceConfidence: 99.9991226196289
   }
   */
 });

