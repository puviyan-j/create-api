import { getAnswers } from "./prompts/index.js"

export const run = async()=>{
    const answer= await getAnswers();
    console.log(answer )
}