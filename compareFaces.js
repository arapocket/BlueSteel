
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
  SimilarityThreshold: 80, 
  SourceImage: {
   S3Object: {
    Bucket: "rekog-image-bucket", 
    Name: "pb.png"
   }
  }, 
  TargetImage: {
   S3Object: {
    Bucket: "rekog-image-bucket", 
    Name: "IMG_2295.jpg"
   }
  }
 };
 rekognition.compareFaces(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(JSON.stringify(data));           // successful response
   /*
   data = {
    FaceMatches: [
       {
      Face: {
       BoundingBox: {
        Height: 0.33481481671333313, 
        Left: 0.31888890266418457, 
        Top: 0.4933333396911621, 
        Width: 0.25
       }, 
       Confidence: 99.9991226196289
      }, 
      Similarity: 100
     }
    ], 
    SourceImageFace: {
     BoundingBox: {
      Height: 0.33481481671333313, 
      Left: 0.31888890266418457, 
      Top: 0.4933333396911621, 
      Width: 0.25
     }, 
     Confidence: 99.9991226196289
    }
   }
   */
 });