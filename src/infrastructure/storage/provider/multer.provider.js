const multer = require('multer');

module.exports = (profile) => {
  return multer({
    storage: profile.storage,

    fileFilter: profile.fileFilter,

    limits: {
      fileSize: profile.maxSize,
    },
  });
};
