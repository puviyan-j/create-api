export interface Answers {
      projectName: string;
      packageManager: "npm" | "pnpm" | "yarn" | "bun";
      language: "typescript" | "javascript";
      architecture: "mvc" | "feature";
      validation: "zod" | "joi" | "express-validator" | "none";
      logger: "pino" | "winston" | "none";
      swagger: boolean;
      husky: boolean;
      git: boolean;
      installDependencies: boolean 
    }
