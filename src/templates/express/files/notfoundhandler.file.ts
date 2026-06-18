import type { Answers } from "../../../types/answers.js";

export function notfoundhandler(answer: Answers) {

  const { module, language } = answer;

 

  return `
  ${language === "typescript" ?"import type {Request,Response} from 'express'":''}

    function notfoundHandler(${language === 'typescript' ? '_req:Request,res: Response' : 'req,res'}) {
    res.status(404).json({
    success: false,
    message: "API not found",
    });
    };
    ${module === 'commonjs' ? 'module.exports={notfoundHandler}' : 'export {notfoundHandler}'}
        
    `
}