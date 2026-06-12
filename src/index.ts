import { copynestfolder } from "./generators/copynest.generator.js";
import { runGenerator } from "./generators/index.js";
import { createProjectDirectory } from "./generators/project.generator.js";
import { getAnswers } from "./prompts/index.js"
import { expressTemplate } from "./templates/express/index.js";
import type { Answers, nestProject } from "./types/answers.js";

export const run = async () => {
    const answer: Answers | nestProject = await getAnswers();

    
    if (answer.framework === "express") {
        const projectPath = await createProjectDirectory(answer.projectName);
        await runGenerator(answer as Answers, projectPath);
        await expressTemplate(answer as Answers, projectPath);
    };
    if (answer.framework === "nest") {
        await copynestfolder(answer as nestProject )
    };
    console.log(answer)
}