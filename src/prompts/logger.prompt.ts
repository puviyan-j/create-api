import { select } from "@inquirer/prompts";

export async function loggerPrompt() {
  return select({
      message: "Logger:",
          choices: [
                { name: "Pino (Recommended)", value: "pino" },
                      { name: "Winston", value: "winston" },
                            { name: "None", value: "none" },
                                ],
                                  });
                                  }