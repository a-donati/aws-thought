const { v4: uuidv4 } = require('uuid');

const params = (fileName) => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
  
    const imageParams = {
      // Replace the <My_Bucket_Name> with the name of your own S3 bucket
      Bucket: 'user-images-351cfa7c-270b-4989-96f6-03b1de8d0f60',
      Key: `${uuidv4()}.${fileType}`,
      Body: fileName.buffer,
    };
  
    return imageParams;
  };

  module.exports = params;