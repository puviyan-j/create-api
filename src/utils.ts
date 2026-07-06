import chalk from 'chalk';
import { generateStarter } from './generators/staterconfig.generator.js';
import { rebuildanswer } from './prompts/index.js';
import type { Answers } from './types/answers.js';
import fs from 'fs-extra';
import gradient from 'gradient-string';
import prettier from "prettier"

const brand = gradient(['#00f5a0', '#00d9f5']);

export async function getprojectdetails(): Promise<Answers> {
  try {
    const data = fs.readJSONSync('.api-starter-cli.json');
    return data;
  } catch (error) {
    const data = await rebuildanswer();
    await generateStarter(data, './');
    return data;
  }
}

export const packageManagers = {
  npm: 'install',
  pnpm: 'add',
  yarn: 'add',
};

export function printHeader() {
  const banner = `
                      _                     _       _             _                   _ _
   ___ _ __ ___  __ _| |_ ___    __ _ _ __ (_)  ___| |_ __ _ _ __| |_ ___ _ __    ___| (_)
 /  __| '__/ _ \\/ _\` | __/ _ \\  / _\` | '_ \\| | / __| __/ _\` | '__| __/ _ \\ '__|  / __| | |
|  (__| | |  __/ (_| | ||  __/ | (_| | |_) | | \\__ \\ || (_| | |  | ||  __/ |    | (__| | |
 \\____|_|  \\___|\\__,_|\\__\\___|  \\__,_| .__/|_| |___/\\__\\__,_|_|   \\__\\___|_|     \\___|_|_|
                                     |_|
`;

  console.log(brand(banner));
};

export async function writeFormattedFile(files: { name: string, content: string }[]) {

  for (const file of files) {
    const exists = await fs.exists(file.name);
    if (exists) continue;
 
  const formatted = await prettier.format(file.content, {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    useTabs: false,
    trailingComma: 'all',
    printWidth: 100,
    arrowParens: 'always',
    bracketSpacing: true,
    endOfLine: 'lf',
    filepath: file.name, 
  });

  await fs.outputFile(file.name, formatted);

   }
}
