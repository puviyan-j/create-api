import type { Architecture, Language, Module } from "../../../types/answers.js";

export function generateUserroutes(module: Module, language: Language, architecture: Architecture) {

    if (module === "commonjs") return cjs(architecture);

    return esm(architecture, language)

};

const esm = (architecture: Architecture,language: Language) => {

    return`
    import express from "express";
    import {
        getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
    } from ${architecture === "mvc"?"'../controllers/user.controller.js'":"'./user.controller.js'"};

    const router = express.Router();

    router
        .route("/")
        .get(getUsers)
        .post(createUser);

    router
        .route("/:id")
        .get(getUserById)
        .put(updateUser)
        .delete(deleteUser);

    export default router;`
};

const cjs = (architecture: Architecture) => {

    return`
    const express= require("express");
    const {
        getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
    } = require(${architecture==="mvc"?"'../controllers/user.controller.js'":"'./user.controller.js'"});

    const router = express.Router();

    router
        .route("/")
        .get(getUsers)
        .post(createUser);

    router
        .route("/:id")
        .get(getUserById)
        .put(updateUser)
        .delete(deleteUser);

    module.exports = router;`
}