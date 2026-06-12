import type { Answers } from "../../types/answers.js";
import { createfile } from "./files.js";
import { generateFolders } from "./folders.js";
import { generatetsconfigfile } from "./files/tsconfig.file.js"
import { execa } from 'execa'
import { confirm } from "@inquirer/prompts";
import ora from "ora"

export async function expressTemplate(answer: Answers, projectPath: string) {

    const { language, architecture } = answer;

    const spinner = ora('create folders').start();

    await generateFolders(answer, projectPath);
    await createfile(answer, projectPath);

    spinner.stop()

    const installdep = await confirm({ message: "Install dependencies", default: false })

    if (language === 'typescript') await generatetsconfigfile(projectPath)
    if (!installdep) {
        return;
    };

    await installdependencies(projectPath, answer)


}

const packageManagers = {
    npm: "install",
    pnpm: "add",
    yarn: "add"
}

async function installdependencies(projectPath: string, answer: Answers) {
    const { language, validation, database, orm, logger, module, packageManager ,projectName} = answer
    const dependencies = ["express", "cors", "helmet", "dotenv"];
    const devdependencies = ["prettier", "eslint"];

    const istypescript = language === "typescript" ? true : false

    if (istypescript) {
        devdependencies.push("@types/node", "@types/express", "@types/cors")
    }

    if (validation !== "none") {
        dependencies.push(validation)
    }

    if (database === "mongodb") {
        if (orm !== "none") {
            dependencies.push(orm)
        }
    }

    if (logger !== "none") {
        dependencies.push(logger)
        if (logger === "pino") devdependencies.push("pino-pretty");
    }

    const depSpinner = ora('Installing dependencies...').start();

    await execa(packageManager, [packageManagers[packageManager], ...dependencies], { cwd: projectPath });

    depSpinner.succeed('Dependencies installed');

    const devSpinner = ora('Installing devDependencies...').start();

    await execa(packageManager, [packageManagers[packageManager], '-D', ...devdependencies], { cwd: projectPath });

    devSpinner.succeed('DevDependencies installed');

    lastlog(projectName,packageManager)

};

import chalk from 'chalk';
const runCommand = (packageManager: "npm" | "pnpm" | "yarn") => packageManager === 'npm'
    ? 'npm run dev'
    : packageManager === 'yarn'
        ? 'yarn dev'
        : 'pnpm dev';

const lastlog = (projectName:string,packageManager: "npm" | "pnpm" | "yarn") => {
    console.log('\n' + chalk.green('✔ Project created successfully!') + '\n');
    console.log(chalk.cyan('Next steps:'));
    console.log('');
    console.log(`  ${chalk.yellow('cd')} ${projectName}`);
    console.log(`  ${chalk.yellow(runCommand(packageManager))}`);
    console.log('');
}

