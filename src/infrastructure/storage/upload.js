const createUpload = require('./config/multer.factory');

const avatar = require('./profiles/avatar.profile');

module.exports = {
  avatar: createUpload(avatar),
};
