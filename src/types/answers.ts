export interface Answers {
      projectName: string;
      packageManager: "npm" | "pnpm" | "yarn" | "bun";
      language: "typescript" | "javascript";
      architecture: "mvc" | "feature";
      module:'commonjs'|'modulejs'
      validation: "zod" | "joi" | "express-validator" | "none";
      logger: "pino" | "winston" | "none";
      database:"mongodb"|"mysql"|"postgresql"|"none";
      orm:'mongoose'|'drizzle'|'prisma'|"sequelize"|"none";
      framework:'express'|'nest'
    }
