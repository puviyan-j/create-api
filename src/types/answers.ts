export interface Answers {
  projectName: string;
  packageManager: "npm" | "pnpm" | "yarn";
  language: "typescript" | "javascript";
  architecture: "mvc" | "feature";
  module: 'commonjs' | 'modulejs'
  validation: "zod" | "joi" | "none";
  logger: "pino" | "winston" | "none";
  database: "mongodb" | "mysql" | "postgresql" | "none";
  orm: 'mongoose' | 'drizzle' | 'prisma' | "sequelize" | "none";
  framework: 'express' | 'nest'
}

export type nestProject = Pick<Answers, "projectName" | "framework">;
export type Language = Answers["language"];
export type Logger = Answers["logger"];
export type Module = Answers["module"];
export type Architecture = Answers["architecture"];
export type Orm = Answers["orm"];
export type Validation = Answers["validation"]

