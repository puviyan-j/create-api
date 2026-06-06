
import { architecturePrompt } from './architecture.prompt.js'
import { databasePrompt } from './database.prompt.js'
import { frameworkPrompt } from './framework.prompt.js'
import { languagePrompt } from './language.prompt.js'
import { loggerPrompt } from './logger.prompt.js'
import { modulePrompt } from './module.prompt.js'
import { ormPrompt } from './orm.prompt.js'
import { packageManagerPrompt } from './package-manager.js'
import {projectPrompt} from './project.prompt.js'
import { validationPrompt } from './validation.prompt.js'
export async function getAnswers() {
    
 
    const answer = {
          projectName: await projectPrompt(),
          framework:await frameworkPrompt(),
          packageManager:await packageManagerPrompt(),
          language:await languagePrompt(),
          module:await modulePrompt(),
          architecture:await architecturePrompt(),
          validation:await validationPrompt(),
          logger:await loggerPrompt(),
          database: await databasePrompt(),
          
}

const orm = answer.database ==='none'?'none':await ormPrompt(answer.database)



return {
    ...answer,orm
}

}