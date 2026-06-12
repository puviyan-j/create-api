import type { Module, Language, Architecture } from "../../../types/answers.js"

export function generateUsercontroller(module: Module, language: Language, architecture: Architecture) {

    if (module === "commonjs") return cjs(architecture);

    return esm(architecture, language)

}

const esm = (architecture: Architecture, language: Language) => {

    return `
   import { asyncHandler } from ${architecture === 'mvc' ? "'../utils/asyncHandler.js'" : "'../../utils/asyncHandler.js'"};
   import * as userService from ${architecture === 'mvc' ? "'../services/user.services.js'" : "'./user.services.js'"};
   
   export const getUsers = asyncHandler(async (req, res) => {
       const users = await userService.getUsers();
   
       res.status(200).json({
           success: true,
           data: users,
       });
   });
   
   export const getUserById = asyncHandler(async (req, res) => {
       const user = await userService.getUserById(req.params.id);
   
       res.status(200).json({
           success: true,
           data: user,
       });
   });
   
   export const createUser = asyncHandler(async (req, res) => {
       const user = await userService.createUser(req.body);
   
       res.status(201).json({
           success: true,
           data: user,
       });
   });
   
   export const updateUser = asyncHandler(async (req, res) => {
       const user = await userService.updateUser(req.params.id, req.body);
   
       res.status(200).json({
           success: true,
           data: user,
       });
   });
   
   export const deleteUser = asyncHandler(async (req, res) => {
       await userService.deleteUser(req.params.id);
   
       res.status(200).json({
           success: true,
           message: "User deleted successfully",
       });
   });`



}

const cjs = (architecture: Architecture) => {
    return `
   const { asyncHandler } = require(${architecture === 'mvc' ? "'../utils/asyncHandler.js'" : "'../../utils/asyncHandler.js'"});
   const userService = require(${architecture === 'mvc' ? "'../services/user.services.js'" : "'./user.services.js'"});
   
   const getUsers = asyncHandler(async (req, res) => {
       const users = await userService.getUsers();
   
       res.status(200).json({
           success: true,
           data: users,
       });
   });
   
   const getUserById = asyncHandler(async (req, res) => {
       const user = await userService.getUserById(req.params.id);
   
       res.status(200).json({
           success: true,
           data: user,
       });
   });
   
   const createUser = asyncHandler(async (req, res) => {
       const user = await userService.createUser(req.body);
   
       res.status(201).json({
           success: true,
           data: user,
       });
   });
   
   const updateUser = asyncHandler(async (req, res) => {
       const user = await userService.updateUser(req.params.id, req.body);
   
       res.status(200).json({
           success: true,
           data: user,
       });
   });
   
   const deleteUser = asyncHandler(async (req, res) => {
       await userService.deleteUser(req.params.id);
   
       res.status(200).json({
           success: true,
           message: "User deleted successfully",
       });
   });
   
   module.export = {getUsers ,getUserById ,createUser , updateUser ,deleteUser}
   `

}