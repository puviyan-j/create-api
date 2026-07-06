import fsExtra from 'fs-extra';
import type { Answers } from '../../../types/answers.js';
import { writeFormattedFile } from '../../../utils.js';

export async function createuploadservice(answer: Answers) {
  const { language, module } = answer;
  const ext = language === 'typescript' ? '.ts' : '.js';

  const factory = `
const multerProvider = require("./providers/multer.provider");

function createUpload(profile) {
    return multerProvider(profile);
}

module.exports = createUpload;`;

  const provider = `
const multer = require("multer");

module.exports = (profile) => {

    return multer({

        storage: profile.storage,

        fileFilter: profile.fileFilter,

        limits: {
            fileSize: profile.maxSize
        }

    });

};`;

  const validater = `const allowed = [

    "image/jpeg",

    "image/png",

    "image/webp"

];

module.exports = (req, file, cb) => {

    if (!allowed.includes(file.mimetype)) {

        return cb(new Error("Invalid image"));

    }

    cb(null, true);

};`;

  const profile = `
const storage = require("../adapters/local.adapter");
const imageValidator = require("../validators/image.validator");

module.exports = {

    storage,

    fileFilter: imageValidator,

    maxSize: 2 * 1024 * 1024,

    maxFiles: 1

};`;

  const upload = `
const createUpload = require("./config/multer.factory");

const avatar = require("./profiles/avatar.profile");


module.exports = {

    avatar: createUpload(avatar),


};
`;

  const adapter = `module.exports = {

    upload(file){

        return {
            url: \`/uploads/\${file.filename}\`
        };

    }

};`;

  const files = [
    { name: `src/infrastructure/storage/upload.factory${ext}`, content: factory },
    { name: `src/infrastructure/storage/provider/multer.provider${ext}`, content: provider },
    { name: `src/infrastructure/storage/adapters/local.adapters${ext}`, content: adapter },
    { name: `src/infrastructure/storage/profiles/avatar.profile${ext}`, content: profile },
    { name: `src/infrastructure/storage/upload${ext}`, content: upload },
    { name: `src/infrastructure/storage/validators/image.validator${ext}`, content: validater },
  ];

  await writeFormattedFile(files)

  return;
}
