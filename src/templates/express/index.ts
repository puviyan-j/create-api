import type { Answers } from '../../types/answers.js';
import { createfile } from './files.js';
import { generateFolders } from './folders.js';
import { generatetsconfigfile } from './files/tsconfig.file.js';
import { execa } from 'execa';
import { confirm } from '@inquirer/prompts';
import ora from 'ora';
import { packageManagers } from '../../utils.js';
import { createdatabase } from './files/database/index.js';
import { lastlog, prismalog } from './utils.js';

export async function expressTemplate(answer: Answers, projectPath: string) {
  const { language, architecture, packageManager, projectName, database } = answer;
  const spinner = ora('create folders').start();

  await generateFolders(answer, projectPath);
  await createfile(answer, projectPath);

  spinner.stop();

  await createdatabase(answer, projectPath);

  const installdep = await confirm({ message: 'Install dependencies', default: false });

  prismalog();

  if (language === 'typescript') await generatetsconfigfile(projectPath);

  if (installdep) {
    await installdependencies(projectPath, answer);
  }
  lastlog(projectName, packageManager, installdep);
}

async function installdependencies(projectPath: string, answer: Answers) {
  const { language, validation, database, orm, logger, module, packageManager, projectName } =
    answer;
  const dependencies = ['express', 'cors', 'helmet', 'dotenv'];
  const devdependencies = ['prettier', 'eslint', '@eslint/js', 'globals'];

  const istypescript = language === 'typescript' ? true : false;

  if (istypescript) {
    devdependencies.push('@types/node', '@types/express', '@types/cors', 'typescript-eslint');
  }

  if (validation !== 'none') {
    dependencies.push(validation);
  }

  if (database === 'mongodb') {
    if (orm !== 'none') {
      dependencies.push(orm);
    }
  }

  if (database === 'postgresql') {
    if (orm === 'prisma') {
      dependencies.push('@prisma/client', '@prisma/adapter-pg', 'pg');
      devdependencies.push('prisma');
      if (language === 'typescript') {
        devdependencies.push('@types/pg');
      }
    }
  }

  if (logger !== 'none') {
    dependencies.push(logger);
    if (logger === 'pino') devdependencies.push('pino-pretty');
  }

  const depSpinner = ora('Installing dependencies...').start();

  await execa(packageManager, [packageManagers[packageManager], ...dependencies], {
    cwd: projectPath,
  });

  depSpinner.succeed('Dependencies installed');

  const devSpinner = ora('Installing devDependencies...').start();

  await execa(packageManager, [packageManagers[packageManager], '-D', ...devdependencies], {
    cwd: projectPath,
  });

  devSpinner.succeed('DevDependencies installed');
}
