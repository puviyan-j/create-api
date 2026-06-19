import type { Module } from "../../../../types/answers.js";
export function createmongooseconnection(module: Module) {

    return `
${module === "commonjs" ? "const mongoose =require('mongoose')" : "import mongoose from 'mongoose'"};
const url = process.env.DATABASE ?? "mongodb://localhost:27017/test";
async function connectDb() {
    try {
        await mongoose.connect(url)
        console.log("database connected successfull")

    } catch (error) {
        throw error;
        console.log("database connected failed")
    }
}

${module === "commonjs" ? "module.exports = { connectDb }" : "export { connectDb }"};
`

}

