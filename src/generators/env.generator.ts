import fs from 'fs-extra';
import path from 'node:path';
import type { Database, Orm } from '../types/answers.js';

export async function generateEnv(projectPath: string, database: Database, orm: Orm) {
  const envContent = ['PORT=5000', 'NODE_ENV=development'];

  // if(database === "mongodb" && orm === "mongoose"){
  //   envContent.push('DATABASE_URL=')
  // }
  // if(database === "postgresql" && orm === "prisma"){
  //   envContent.push('DATABASE_URL=postgresql://postgres:root@localhost:5432/postgres?schema=public')
  // }

  await fs.writeFile(path.join(projectPath, '.env'), envContent.join('\n'));
}
