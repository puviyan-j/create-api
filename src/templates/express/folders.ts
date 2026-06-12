import path from "node:path";
import type { Answers } from "../../types/answers.js";
import fs from 'fs-extra'

export async function generateFolders(answers: Answers, pathName: string) {
    const { architecture, language } = answers;
    if (architecture === 'mvc') await mvc(language, pathName);
    if (architecture === 'feature') await feature(language, pathName);
}

async function mvc(language: 'javascript' | 'typescript', pathName: string) {
    const folders: string[] = ['controllers', 'config', 'models', 'routes', 'services', 'middlewares', 'validations',"repositorys", 'utils'];

    if (language === 'typescript') {
        folders.push('types')
    }

    await fs.mkdir(path.join(pathName, 'src'));

    for (let folder of folders) {
        await fs.mkdir(path.join(pathName, `src/${folder}`));
    }



}

async function feature(language: 'javascript' | 'typescript', pathName: string) {
    const folders: string[] = ["config","middlewares","routes","utils","modules","modules/user","modules/auth"];

    await fs.mkdir(path.join(pathName, 'src'));

    for (let folder of folders) {
        await fs.mkdir(path.join(pathName, `src/${folder}`));
    }

}