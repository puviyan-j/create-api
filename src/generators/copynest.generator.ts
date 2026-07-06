import type { nestProject } from '../types/answers.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// go to project root (dist -> root)
const rootDir = path.resolve(__dirname, '../../../');

export async function copynestfolder(answer: nestProject) {
  const templatePath = path.join(rootDir, 'templates', 'nest');
  const targetPath = path.join(process.cwd(), answer.projectName);

  await fs.copy(templatePath, targetPath);
}
