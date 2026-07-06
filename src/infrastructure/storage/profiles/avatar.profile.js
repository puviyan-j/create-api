const storage = require('../adapters/local.adapter');
const imageValidator = require('../validators/image.validator');

module.exports = {
  storage,

  fileFilter: imageValidator,

  maxSize: 2 * 1024 * 1024,

  maxFiles: 1,
};
