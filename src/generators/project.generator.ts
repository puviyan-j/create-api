import fs from "fs-extra";
import path from "node:path";

export async function createProjectDirectory(
  projectName: string
) {
  const projectPath = path.resolve(projectName);

  await fs.ensureDir(projectPath);

  return projectPath;
}