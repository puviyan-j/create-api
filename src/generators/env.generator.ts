import fs from "fs-extra";
import path from "node:path";

export async function generateEnv(
  projectPath: string
  ) {
    const envContent = `
    PORT=5000
    NODE_ENV=development
    `;

      await fs.writeFile(
          path.join(projectPath, ".env"),
              envContent.trim()
                );
                }