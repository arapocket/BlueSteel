
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

/** This operation gets an image from local and uploads to S3*/ 
//Works ###### Wed Jun 13 16:57:49 PDT 2018

fs = require('fs');

const imageName = "64921ae8eae6440b365e0a45eec7eb93"
// Read in the file, convert it to base64, store to S3
fs.readFile(imageName, function (err, data) {
  if (err) { throw err; }

  //var base64data = new Buffer(data, 'binary').toString('base64'); // accroding to stackoverflow, dont need to convert

  var s3 = new AWS.S3();
  s3.putObject({
    Bucket: 'rekog-image-bucket',
    Key: imageName,
    //Body: base64data
    Body: data

  },  function(err, data) {
    if (err) {console.log(err, err.stack); // an error occurred
    }else{
      console.log("success: "+ JSON.stringify(data)); 

      //* This operation searches for faces in a Rekognition collection that match the largest face in an S3 bucket stored image. */
      var params = {
        CollectionId: "myTestImages", 
        FaceMatchThreshold: 80, 
        Image: {
          
        S3Object: {
          Bucket: "rekog-image-bucket", 
          Name: imageName
        }
        }, 
        MaxFaces: 5
      };
      rekognition.searchFacesByImage(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     
        console.log(JSON.stringify(data));  
        console.log(JSON.stringify("Match confidence Level: " + data.FaceMatches[0].Similarity))
        console.log(JSON.stringify("Matched image ID: " + data.FaceMatches[0].Face.ExternalImageId))         // successful response
        // successful response
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

    }              // successful response
   
  });

  
})


