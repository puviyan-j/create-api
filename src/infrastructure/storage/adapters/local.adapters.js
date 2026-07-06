module.exports = {
  upload(file) {
    return {
      url: `/uploads/${file.filename}`,
    };
  },
};
