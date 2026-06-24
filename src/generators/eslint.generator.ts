// eslint, @eslint/js, globals, typescript-eslint

import type { Answers } from "../types/answers.js";
import fs from "fs-extra";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// go to project root (dist -> root)
const rootDir = path.resolve(__dirname, "../../../");

export async function generatorEslint(answer: Answers, pathname: string) {

    if (answer.language === "typescript") {
        await fs.copyFile(path.join(rootDir,"./templates/eslint/modulets.ts"), path.join(pathname, './eslint.config.ts'));
        return;
    }

    if (answer.module === "modulejs") {
        await fs.copyFile(path.join(rootDir,"./templates/eslint/modulejs.ts"), path.join(pathname, './eslint.config.js'));
        return;
    };

    if (answer.module === "commonjs") {
        await fs.copyFile(path.join(rootDir,"./templates/eslint/commonjs.ts"), path.join(pathname, './eslint.config.mjs'));
        return;
    }

}