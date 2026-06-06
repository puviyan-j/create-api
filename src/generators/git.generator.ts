import fs from 'fs-extra';
import path from 'path'

export async function generatorGit(pathName: string) {
    const gitignorecontent=`
    node_modules
    dist
    .env
    .env.*`
    await fs.writeFile(path.join(pathName,'.gitignore'),gitignorecontent.trim())
    
}