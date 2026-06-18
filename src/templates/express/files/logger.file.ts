import type { Module, Language, Logger } from "../../../types/answers.js";

const imports = (module: Module, istypescript: boolean, logger: Logger): string => {
    if (module === "commonjs") return `const ${logger} = require('${logger}')`
    if (istypescript) return `import ${logger} ,{ type Logger as ${logger}Logger }  from '${logger}'`;
    return `import ${logger}  from '${logger}'`
}

export function generateLogger(module: Module, language: Language, logger: Logger) {

    const type = `
  export interface ILogger {
  info(message: string, meta?: Record<string, any>): void;
  warn(message: string, meta?: Record<string, any>): void;
  error(message: string, meta?: Record<string, any>): void;
  debug(message: string, meta?: Record<string, any>): void;
 }`

    const istypescript = language === "typescript" ? true : false;
    const ispino = logger === "pino" ? true : false;


    return `
    ${imports(module, istypescript, logger)}

    ${istypescript ? type : ""}

    const isDev = process.env.NODE_ENV !== 'production'
    
    class Logger ${istypescript ? "implements ILogger" : ""} {

    ${istypescript ? `private logger: ${logger}Logger;` : ""}
     constructor() {
         ${ispino ? pino() : winston()}
        };

  info(message ${istypescript ? ':string' : ''}, meta = {}) {
    ${ispino ? 'this.logger.info(meta, message)' : 'this.logger.info( message,meta)'}
  }
  warn(message ${istypescript ? ':string' : ''}, meta = {}) {
    ${ispino ? 'this.logger.info(meta, message)' : 'this.logger.info( message,meta)'}
  }
  error(message ${istypescript ? ':string' : ''}, meta = {}) {
    ${ispino ? 'this.logger.info(meta, message)' : 'this.logger.info( message,meta)'}
  }
  debug(message ${istypescript ? ':string' : ''}, meta = {}) {
     ${ispino ? 'this.logger.info(meta, message)' : 'this.logger.info( message,meta)'}
  }
}
const logger = new Logger();

${module === "commonjs" ? "module.exports = {logger}" : " export {logger}"}`

}

const winston = () => {
    return `this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });`


}

const pino = () => {

    return `this.logger = pino({
        level: process.env.LOG_LEVEL || "info",
        ...(isDev && {
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                },
            }
        })
    })`

}



