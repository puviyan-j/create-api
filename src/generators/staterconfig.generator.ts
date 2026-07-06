import type { Answers } from '../types/answers.js';
import fs from 'fs-extra';
import path from 'path';

export async function generateStarter(answer: Answers, projectPath: string) {
  await fs.writeJSON(path.join(projectPath, '.api-starter-cli.json'), answer, { spaces: 2 });

  return;
}
