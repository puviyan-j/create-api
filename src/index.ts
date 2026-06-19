import path from "path";
import fs from "fs-extra"
import { copynestfolder } from "./generators/copynest.generator.js";
import { runGenerator } from "./generators/index.js";
import { createProjectDirectory } from "./generators/project.generator.js";
import { generateStarter } from "./generators/staterconfig.generator.js";
import { getAnswers } from "./prompts/index.js"
import { expressTemplate } from "./templates/express/index.js";
import { generatemodule, getprojectdetails } from "./templates/express/resource/index.js";
import type { Answers, nestProject } from "./types/answers.js";
import type { ResourceGenerator } from "./types/generators.js";

export const run = async () => {
    const answer: Answers | nestProject = await getAnswers();
    
    if (answer.framework === "express") {
        const projectPath = await createProjectDirectory(answer.projectName);
        await runGenerator(answer as Answers, projectPath);
        await expressTemplate(answer as Answers, projectPath);
        await generateStarter(answer as Answers, projectPath)
    };
    if (answer.framework === "nest") {
        await copynestfolder(answer as nestProject)
    };

}

export async function generator(data: ResourceGenerator) {
    try {
        const answer = getprojectdetails();

        data.name = data.name.trim().toLowerCase();

        if (answer.architecture === 'feature') {
            const isexist = await fs.exists(`src/modules/${data.name}`);
            if (isexist) throw 'module already registed'
        }

        await generatemodule(answer, data)

    } catch (error) {
        console.log(error)
    }
}

