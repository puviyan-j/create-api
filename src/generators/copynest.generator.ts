import fs from "fs-extra";
import path from "path"
import type { nestProject } from "../types/answers.js";
import { execa } from "execa";

export async function copynestfolder(answer:nestProject ){

    await fs.copy(path.resolve("./templates/nest"),`./${answer.projectName}`)

}