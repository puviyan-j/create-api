const multerProvider = require('./providers/multer.provider');

function createUpload(profile) {
  return multerProvider(profile);
}

module.exports = createUpload;
