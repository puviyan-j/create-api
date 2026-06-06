import { runGenerator } from "./generators/index.js";
import { getAnswers } from "./prompts/index.js"
import { expressTemplate } from "./templates/express/index.js";

export const run = async()=>{
    const answer= await getAnswers();
    if(answer.framework ==="express"){
    const projectPath = await runGenerator(answer);
    await expressTemplate(answer,projectPath);
}
    console.log(answer )
}