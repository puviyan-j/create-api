import { select } from "@inquirer/prompts";

export async function databasePrompt() {
  return select({
      message: "Select database:",
          choices: [
            {     name: "MongoDB",
                  value: "mongodb",
            },
            {
                  name: "PostgreSQL",
                  value: "postgresql",
            },
            {
                  name: "MySQL",
                  value: "mysql",
            },
            {
                  name: "None",
                  value: "none",
            },
                  ],
            });
            };