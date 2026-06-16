// eslint, @eslint/js, globals, typescript-eslint

import type { Answers } from "../types/answers.js";
import fs from "fs-extra";
import path from "path";

export async function generatorEslint(answer: Answers, pathname: string) {
    if (answer.language === "typescript") {
        await fs.copyFile(path.resolve("./templates/eslint/modulets.ts"), path.join(pathname, './eslint.config.ts'));
        return;
    }

    if (answer.module === "modulejs") {
        await fs.copyFile(path.resolve("./templates/eslint/modulejs.ts"), path.join(pathname, './eslint.config.js'));
        return;
    };

    if (answer.module === "commonjs") {
        await fs.copyFile(path.resolve("./templates/eslint/commonjs.ts"), path.join(pathname, './eslint.config.mjs'));
        return;
    }

}