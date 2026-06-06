import { select } from "@inquirer/prompts";

export async function languagePrompt() {
  return select({
      message: "Select language:",
          choices: [
                { name: "TypeScript", value: "typescript" },
                      { name: "JavaScript", value: "javascript" },
                          ],
                            });
                            }