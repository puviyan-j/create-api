import { select } from "@inquirer/prompts";

export async function validationPrompt() {
  return select({
      message: "Validation library:",
          choices: [
                { name: "Zod", value: "zod" },
                      { name: "Joi", value: "joi" },
                            { name: "Express Validator", value: "express-validator" },
                                  { name: "None", value: "none" },
                                      ],
                                        });
                                        }