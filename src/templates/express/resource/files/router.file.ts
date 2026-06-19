import type { Architecture, Language, Module } from "../../../../types/answers.js";

export function generateroutes(module: Module, language: Language, architecture: Architecture, name: string) {

    if (module === "commonjs") return cjs(architecture ,name);

    return esm(architecture, language, name)

};

const esm = (architecture: Architecture, language: Language, name: string) => {

    return `
    import express from "express";
    import {
        get${name}s,
        get${name}ById,
        create${name},
        update${name},
        delete${name},
    } from ${architecture === "mvc" ? `'../controllers/${name}.controller.js'` : `'./${name}.controller.js'`};

    const router = express.Router();

    router
        .route("/")
        .get(get${name}s);

    router
        .route("/:id")
        .get(get${name}ById)
        .put(update${name})
        .delete(delete${name});    


    export default router;`
};

const cjs = (architecture: Architecture, name: string) => {

    return `
    const express= require("express");
    const {
        get${name}s,
        get${name}ById,
        create${name},
        update${name},
        delete${name},
       
    } = require(${architecture === "mvc" ? `'../controllers/${name}.controller'` : `'./${name}.controller'`});

    const router = express.Router();

    router
        .route("/")
        .get(get${name}s,);
    
    router
        .route("/:id")
        .get(get${name}ById)
        .put(update${name})
        .delete(delete${name});
       
    module.exports = router;`
}