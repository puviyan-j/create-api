import type { Module ,Language ,Architecture } from "../../../types/answers.js";

export function RouterIndex(module: Module, language:Language,architecture:Architecture): string {
    const cjs = `
    const router = require("express").Router();\n

    router.get("/health",(req,res)=>{res.json('Api working')});
    
    router.use("/users",require( ${architecture === "mvc"?"'./users.routes'":"'../modules/user/user.routes'"}));\n
    module.exports = router;
    `
    const esm = `
    import express from 'express';\n
    const router = express.Router();\n
    
    import userRoutes from ${architecture === "mvc"?"'./users.routes'":"'../modules/user/user.routes.js'"}
   
    router.get("/health",(req,res)=>{res.json('Api working')});

    router.use('/users',userRoutes)

    export default router    
    `
    const typescript = `
    import {Router,type Request ,type Response } from 'express';\n
    const router = Router();\n
    import  userRoutes from ${architecture === "mvc"?"'./users.routes'":"'../modules/user/user.routes.js'"}\n
    router.get("/health",(req:Request,res:Response)=>{res.json('Api working')});\n
    router.use('/users',userRoutes)\n
    export default router `


    if (language === "typescript") return typescript;
    if (module === "commonjs") return cjs;
    return esm;

};


