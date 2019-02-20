const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});
const s3 = new aws.S3();

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: 'codus-profile-images',
    acl: 'public-read',
    // Set filename to current time
    key: (req, file, cb) => cb(null, Date.now().toString()),
  }),

  fileFilter(req, file, cb) {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const mimeSupported = supportedTypes.includes(file.mimetype);
    const err = mimeSupported ? null : new Error(`MIME type ${file.mimetype} is not one of ${supportedTypes.join(', ')}`);
    if (err) err.statusCode = 415;
    cb(err, mimeSupported);
  },
});
