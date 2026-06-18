export function asynchandler(module: "commonjs" | "modulejs", language: "typescript"|"javascript"): string {
    const js = `const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
${module === "commonjs" ? 'module.exports = {asyncHandler}' : "export {asyncHandler}"};`

    const ts = `import type{ Request, Response, NextFunction } from 'express';

export const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };`

    if (language === "typescript") return ts;
    return js;
}