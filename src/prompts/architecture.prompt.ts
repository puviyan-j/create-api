import { select } from "@inquirer/prompts";

export async function architecturePrompt() {
  return select({
      message: "Select architecture:",
          choices: [
                { name: "MVC", value: "mvc" },
                      { name: "Feature Based", value: "feature" },
                          ],
                            });
                            }