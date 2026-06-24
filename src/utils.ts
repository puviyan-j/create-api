import { generateStarter } from "./generators/staterconfig.generator.js";
import { rebuildanswer } from "./prompts/index.js";
import type { Answers } from "./types/answers.js";
import fs from "fs-extra"

export async function getprojectdetails(): Promise<Answers> {
    try {
        const data = fs.readJSONSync(".api-starter-cli.json");
        return data
    } catch (error) {
        const data = await rebuildanswer();
      await generateStarter(data,"./",)
        return data
    };
};

export const packageManagers = {
    npm: "install",
    pnpm: "add",
    yarn: "add"
}