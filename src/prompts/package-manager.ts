import {select} from '@inquirer/prompts';

export async function packageManagerPrompt() {
  return select({
      message: "Select package manager:",
          choices: [
                { name: "npm", value: "npm" },
                      { name: "pnpm", value: "pnpm" },
                            { name: "yarn", value: "yarn" },
                                  { name: "bun", value: "bun" },
                                      ],
                                        });
                                        }