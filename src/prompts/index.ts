
import type { Answers, nestProject } from '../types/answers.js'
import { architecturePrompt } from './architecture.prompt.js'
import { databasePrompt } from './database.prompt.js'
import { frameworkPrompt } from './framework.prompt.js'
import { languagePrompt } from './language.prompt.js'
import { loggerPrompt } from './logger.prompt.js'
import { modulePrompt } from './module.prompt.js'
import { ormPrompt } from './orm.prompt.js'
import { packageManagerPrompt } from './package-manager.js'
import { projectPrompt } from './project.prompt.js'
import { validationPrompt } from './validation.prompt.js'
export async function getAnswers() {


    const answer:Answers|nestProject = {
        projectName: await projectPrompt(),
        framework: await frameworkPrompt(),
    }

    if (answer.framework === "nest") return answer;
    // const express = {
    //     packageManager: await packageManagerPrompt(),
    //     architecture: await architecturePrompt(),
    //     validation: await validationPrompt(),

    //     database: await databasePrompt(),
    // }

    (answer as Answers).packageManager = "npm";
    (answer as Answers).language = await languagePrompt();
    (answer as Answers).module = (answer as Answers).language ==="typescript"?"modulejs":await modulePrompt();
  

    const express = {
        architecture: await architecturePrompt(),
        validation: await validationPrompt(),
        logger: await loggerPrompt(),
        database: "none",
    }

    const orm = express.database === 'none' ? 'none' : await ormPrompt(express.database)



    return {
        ...answer, ...express, orm
    }

}