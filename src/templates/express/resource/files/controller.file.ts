import type { Module, Language, Architecture } from "../../../../types/answers.js"

export function generatecontroller(module: Module, language: Language, architecture: Architecture, name: string) {

    if (module === "commonjs") return cjs(architecture, name);
    return esm(architecture, language, name);
}

const esm = (architecture: Architecture, language: Language, name: string) => {

    return `
   import { asyncHandler } from ${architecture === 'mvc' ? "'../utils/asynchandler.js'" : "'../../utils/asynchandler.js'"};
   import * as ${name}Service from ${architecture === 'mvc' ? `'../services/${name}.services.js'` : `'./${name}.services.js'`};
   
   export const get${name}s = asyncHandler(async (req, res) => {
       const ${name}s = await ${name}Service.get${name}s();
   
       res.status(200).json({
           success: true,
           data: ${name}s,
       });
   });

   export const get${name}ById = asyncHandler(async (req, res) => {
       const ${name} = await userService.get${name}ById(req.params.id);
   
       res.status(200).json({
           success: true,
           data: ${name},
       });
   });
   
   export const create${name} = asyncHandler(async (req, res) => {
       const ${name} = await ${name}Service.create${name}(req.body);
   
       res.status(201).json({
           success: true,
           data: ${name},
       });
   });
   
   export const update${name} = asyncHandler(async (req, res) => {
       const ${name} = await ${name}Service.update${name}(req.params.id, req.body);
   
       res.status(200).json({
           success: true,
           data: ${name},
       });
   });
   
   export const delete${name} = asyncHandler(async (req, res) => {
       await ${name}Service.delete${name}(req.params.id);
   
       res.status(200).json({
           success: true,
           message: "${name} deleted successfully",
       });
   });
   
   `

}

const cjs = (architecture: Architecture, name: string) => {
    return `
   const { asyncHandler } = require(${architecture === 'mvc' ? "'../utils/asynchandler'" : "'../../utils/asynchandler'"});
   const ${name}Service = require(${architecture === 'mvc' ? `'../services/${name}.services'` : `'./${name}.services'`});
   
   const get${name}s = asyncHandler(async (req, res) => {
       const ${name}s = await ${name}Service.get${name}s();
   
       res.status(200).json({
           success: true,
           data: ${name}s,
       });
   });

   const get${name}ById = asyncHandler(async (req, res) => {
       const ${name} = await ${name}Service.get${name}ById(req.params.id);
   
       res.status(200).json({
           success: true,
           data: ${name},
       });
   });
   
   const create${name} = asyncHandler(async (req, res) => {
       const ${name} = await ${name}Service.create${name}(req.body);
   
       res.status(201).json({
           success: true,
           data: ${name},
       });
   });
   
   const update${name} = asyncHandler(async (req, res) => {
       const ${name} = await ${name}Service.update${name}(req.params.id, req.body);
   
       res.status(200).json({
           success: true,
           data: ${name},
       });
   });
   
   const delete${name} = asyncHandler(async (req, res) => {
       await ${name}Service.delete${name}(req.params.id);
   
       res.status(200).json({
           success: true,
           message: "${name} deleted successfully",
       });
   });
   
   module.exports = {get${name}s ,get${name}ById ,create${name} , update${name} ,delete${name}}
   `

}