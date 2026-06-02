
import { architecturePrompt } from './architecture.prompt.js'
import { databasePrompt } from './database.prompt.js'
import { languagePrompt } from './language.prompt.js'
import { loggerPrompt } from './logger.prompt.js'
import { ormPrompt } from './orm.prompt.js'
import { packageManagerPrompt } from './package-manager.js'
import {projectPrompt} from './project.prompt.js'
import { validationPrompt } from './validation.prompt.js'
export async function getAnswers() {
    
 
    const answer = {
          projectName: await projectPrompt(),
          packageManager:await packageManagerPrompt(),
          language:await languagePrompt(),
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