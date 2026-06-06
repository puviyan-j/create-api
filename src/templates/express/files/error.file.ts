import type { Answers } from "inquirer";

export function generateError(answer:Answers){

    const {module,language,} = answer;
    
    
    return `
    function ErrorHandler(${language === 'typescript'?'err:any,_req:Request,res: Response,next:nextfunction':'err,req,res,next'}) {
      let statusCode = err.status || 500;
      let message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        data: err.data ?? null,
        stack: err.data || err.stack || err,})
    }

    ${module ==='commonjs'?'module.exports={ErrorHandler}':'export {ErrorHandler}'}
        
    `
                                                                                                                                        
                                                                                                        
                                                                                                                                                    module.exports = globalErrorHandler;
}