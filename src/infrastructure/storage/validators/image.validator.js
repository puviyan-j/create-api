const allowed = ['image/jpeg', 'image/png', 'image/webp'];

module.exports = (req, file, cb) => {
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Invalid image'));
  }

  cb(null, true);
};
