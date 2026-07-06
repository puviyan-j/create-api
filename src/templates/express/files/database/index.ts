import type { Answers } from '../../../../types/answers.js';
import fs from 'fs-extra';
import { createmongooseconnection } from './mongoose.js';
import path from 'path';
import { pgPrisma } from './prisma.js';

export async function createdatabase(answer: Answers, projectPath: string) {
  const { language, database, orm, module } = answer;

  const ext = language === 'typescript' ? '.ts' : '.js';

  let data: { name: string; content: string }[] = [];

  if (database === 'mongodb' && orm === 'mongoose') {
    data = createmongooseconnection(answer, ext);
  }

  if (database === 'postgresql' && orm === 'prisma') {
    data = await pgPrisma(language, ext, module);
  }

  for (const file of data) {
    await fs.ensureFile(path.join(projectPath, file.name));
    await fs.writeFile(path.join(projectPath, file.name), file.content);
  }
}
