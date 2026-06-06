import fs from "fs-extra";
import path from "node:path";

export async function generatePrettier(
  projectPath: string
  ) {
    const envContent = `{
      "semi": true,
      "singleQuote": true,
      "tabWidth": 2,
      "useTabs": false,
      "trailingComma": "all",
      "printWidth": 100,
      "arrowParens": "always",
      "bracketSpacing": true,
      "endOfLine": "lf" }`;

      await fs.writeFile(
          path.join(projectPath, ".prettierrc"),
              envContent.trim()
                );

    const prettierignore=`
    # Dependencies
    node_modules
    
    # Build output
    dist
    build
    coverage
    
    # Environment files
    .env
    .env.*
    
    # Logs
    logs
    *.log
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    pnpm-debug.log*
    
    # Cache
    .cache
    .temp
    .tmp
    
    # Generated files
    package-lock.json
    yarn.lock
    pnpm-lock.yaml
    
    # IDE
    .vscode
    .idea
    
    # OS
    .DS_Store
    Thumbs.db
    
    # Generated docs
    docs/api
    
    # Uploads
    uploads
    
    # Prisma
    prisma/migrations
    
    # Public assets
    public`

  await fs.writeFile(path.join(projectPath,'.prettierignore'),prettierignore)
            
}