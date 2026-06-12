
import type { Answers } from "../../types/answers.js";
import fs from 'fs-extra'
import path from 'path'
import { generateIndex } from "./files/index.file.js";
import { appfile } from "./files/app.file.js";
import { generateError } from "./files/error.file.js";
import { RouterIndex } from "./files/routerindex.file.js";
import { asynchandler } from "./files/asynchandler.file.js";
import { generateLogger } from "./files/logger.file.js";
import { generateUsercontroller } from "./files/usercontroller.file.js";
import { generateUserservices } from "./files/userservice.file.js";
import { generateUserRepository } from "./files/userrepository.file.js";
import { generateUserroutes } from "./files/userrouter.file.js";
import { generateUserScheam } from "./files/userschema.file.js";

export async function createfile(answer: Answers, pathName: string) {

    const { architecture } = answer;

    if (architecture === 'mvc') await mvc(answer, pathName);
    if (architecture === 'feature') await feature(answer, pathName);

}

async function mvc(answer: Answers, pathName: string) {

    const { language, module, logger, architecture, orm } = answer

    const files = [
        { name: 'index', content: generateIndex(module) },
        { name: 'app', content: appfile(module) },
        { name: 'config/db', content: '' },
        { name: 'routes/index', content: RouterIndex(module, language, architecture) },
        { name: 'routes/user.routes', content: generateUserroutes(module, language, architecture) },
        { name: 'controllers/user.controller', content: generateUsercontroller(module, language, architecture) },
        { name: 'services/user.services', content: generateUserservices(module, language, architecture) },
        { name: 'models/user.model', content: generateUserScheam(module, orm, language) },
        { name: 'middlewares/auth.middleware', content: '' },
        { name: 'middlewares/error.middleware', content: generateError(answer) },
        { name: 'middlewares/asynchandler.middleware', content: asynchandler(module, language) },
        { name: 'validations/user.validation', content: "" },
        { name: 'repositorys/user.repository', content: generateUserRepository(module, language, architecture) }
    ];

    const ext = language === 'typescript' ? 'ts' : 'js'

    if (logger !== "none") files.push({ name: 'config/logger', content: generateLogger(module, language, logger) });

    for (let file of files) {
        await fs.writeFile(path.join(pathName, `src/${file.name}.${ext}`), file.content)
    }



};


async function feature(answer: Answers, pathName: string) {

    const { language, module, logger, architecture, orm } = answer

    const files = [
        { name: 'index', content: generateIndex(module) },
        { name: 'app', content: appfile(module) },
        { name: 'config/db', content: '' },
        { name: 'routes/index', content: RouterIndex(module, language, architecture) },
        { name: 'middlewares/auth.middleware', content: '' },
        { name: 'middlewares/error.middleware', content: generateError(answer) },
        { name: 'utils/asyncHandler', content: asynchandler(module, language) },
        { name: 'modules/user/user.routes', content: generateUserroutes(module, language, architecture) },
        { name: 'modules/user/user.validation', content: "" },
        { name: 'modules/user/user.controller', content: generateUsercontroller(module, language, architecture) },
        { name: 'modules/user/user.services', content: generateUserservices(module, language, architecture) },
        { name: 'modules/user/user.repository', content: generateUserRepository(module, language, architecture) },
        { name: 'modules/user/user.model', content: generateUserScheam(module, orm, language) },
    ];

    const ext = language === 'typescript' ? 'ts' : 'js';

    if (logger !== "none") files.push({ name: 'config/logger', content: generateLogger(module, language, logger) });

    for (let file of files) {
        await fs.writeFile(path.join(pathName, `src/${file.name}.${ext}`), file.content)
    }



};