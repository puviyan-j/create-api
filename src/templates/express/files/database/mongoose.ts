import type { Answers, Language, Module, Orm } from '../../../../types/answers.js';
import { generateUserScheam } from '../userschema.file.js';

export function createmongooseconnection(answer: Answers, ext: '.js' | '.ts') {
  const { module, architecture, orm, language } = answer;
  const config = `
${module === 'commonjs' ? "const mongoose =require('mongoose')" : "import mongoose from 'mongoose'"};
const url = process.env.DATABASE ?? "mongodb://localhost:27017/test";
async function connectDb() {
    try {
        await mongoose.connect(url)
        console.log("database connected successfull")

    } catch (error) {
        throw error;
        console.log("database connected failed")
    }
}

${module === 'commonjs' ? 'module.exports = { connectDb }' : 'export { connectDb }'};
`;

  const usermodel = generateUserScheam(module, orm, language);

  const files = [{ name: `src/config/db${ext}`, content: config }];

  if (architecture === 'feature')
    files.push({ name: `src/modules/user/user.model${ext}`, content: usermodel });

  if (architecture === 'mvc')
    files.push({ name: `src/models/user.model${ext}`, content: usermodel });

  return files;
}
