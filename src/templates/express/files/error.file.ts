import type { Answers } from "inquirer";

export function generateError(answer: Answers) {

  const { module, language,logger } = answer;

  const esm = `import {logger} from '../config/logger.js'`
  const cjs = `const {logger} =require('../config/logger.js')`


  return `
  ${language === "typescript" ?"import type {Request,Response,NextFunction} from 'express'":''}

  ${logger !== "none"? module==="commonjs"?cjs:esm :""}

    function ErrorHandler(${language === 'typescript' ? 'err:any,_req:Request,res: Response,next:NextFunction' : 'err,req,res,next'}) {
      let statusCode = err.status || 500;
      let message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        data: err.data ?? null,
        stack: err.data || err.stack || err,})
    }

    ${module === 'commonjs' ? 'module.exports={ErrorHandler}' : 'export {ErrorHandler}'}
        
    `
}