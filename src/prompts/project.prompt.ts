import { input } from "@inquirer/prompts";

export async function projectPrompt() {
  return input({
      message: "Project name:",
          default: "my-api",
            });
            }