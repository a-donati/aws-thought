const express = require('express');
const router = express.Router();
// multer being used for handling multipart/form-data - uploading files
const multer = require('multer');
const AWS = require('aws-sdk');
// instantiate the s3 service object
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
  });

// create temp storage container to hold image files until upload
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, '');
    },
  });
  // image is the key!
const upload = multer({ storage }).single('image');

router.post('/image-upload', upload, (req, res) => {
    // set up params config
    // set up S3 service call
  });