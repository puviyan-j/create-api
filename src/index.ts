import path from 'path';
import fs from 'fs-extra';
import { copynestfolder } from './generators/copynest.generator.js';
import { runGenerator } from './generators/index.js';
import { createProjectDirectory } from './generators/project.generator.js';
import { generateStarter } from './generators/staterconfig.generator.js';
import { getAnswers } from './prompts/index.js';
import { expressTemplate } from './templates/express/index.js';
import { generatemodule } from './templates/express/resource/index.js';
import type { Answers, nestProject } from './types/answers.js';
import type { ResourceGenerator } from './types/generators.js';
import type { Feature } from './types/add.js';
import { getprojectdetails, packageManagers, printHeader } from './utils.js';
import { mailService } from './templates/express/addons/mail.file.js';
import { execa } from 'execa';
import { createuploadservice } from './templates/express/addons/upload.file.js';

export const run = async () => {
  printHeader();
  const answer: Answers | nestProject = await getAnswers();

  if (answer.framework === 'express') {
    const projectPath = await createProjectDirectory(answer.projectName);
    await runGenerator(answer as Answers, projectPath);
    await expressTemplate(answer as Answers, projectPath);
    await generateStarter(answer as Answers, projectPath);
  }
  if (answer.framework === 'nest') {
    await copynestfolder(answer as nestProject);
  }
};

export async function generator(data: ResourceGenerator) {
  try {
    const answer = await getprojectdetails();
    data.name = data.name.trim().toLowerCase();
    if (data.type === 'module') {
      await generatemodule(answer, data);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function add(data: Feature[]) {
  const uniqe = new Set(data);
  const answer = await getprojectdetails();
  const install = [];
  const dev = [];

  const packagefile = await fs.readJSON('package.json');

  const dependencies = packagefile.dependencies;
  const devdependencies = packagefile.devdependencies;

  if (uniqe.has('mail')) {
    mailService(answer.module, answer.language);
    if (!dependencies.nodemailer) {
      install.push('nodemailer');
    }
  }

  if (uniqe.has('multer')) {
    await createuploadservice(answer);
  }

  // await execa(answer.packageManager, [packageManagers[answer.packageManager], ...dependencies])
}
