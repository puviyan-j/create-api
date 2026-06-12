import type { Language, Module, Orm } from "../../../types/answers.js";

export function generateUserScheam(module:Module ,orm:Orm ,language:Language) {

    if(orm === "mongoose") return mongoose(module);

    return ''

   
}

const mongoose = (module:Module) =>{

  return `
    ${module === "commonjs"?"const mongoose = require('mongoose')":"import mongoose from 'mongoose'"};

    const userSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },

            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,
            },

            password: {
                type: String,
                required: true,
                minlength: 6,
            },

            role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user',
            },

            isActive: {
                type: Boolean,
                default: true,
            },
        },
        {
            timestamps: true, 
        }
    );

    const UserModel = mongoose.model('User', userSchema);

    ${module === "commonjs"?"module.exports = {UserModel};":" export {UserModel}"}`
}