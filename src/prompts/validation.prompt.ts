import { select } from "@inquirer/prompts";

export async function validationPrompt() {
      return select({
            message: "Validation library:",
            choices: [
                  { name: "Zod", value: "zod" },
                  { name: "Joi", value: "joi" },
                  { name: "other", value: "other" },
                  { name: "None", value: "none" },
            ],
      });
}