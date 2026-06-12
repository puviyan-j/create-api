import type { Module, Language, Architecture } from "../../../types/answers.js";

export function generateUserRepository(module: Module, language: Language, architecture: Architecture) {

    if (module === "commonjs") return cjs(architecture);

    return esm(architecture, language)

}

const esm = (architecture: Architecture, language: Language) => {

    return `

    export const findAll = async () => {
        return await User.find();
    };

    export const findById = async (id) => {
        return await User.findById(id);
    };

    export const create = async (data) => {
        return await User.create(data);
    };

    export const update = async (id, data) => {
        return await User.findByIdAndUpdate(id, data, {
            new: true,
        });
    };

    export const remove = async (id) => {
        return await User.findByIdAndDelete(id);
    };`
}

const cjs = (architecture: Architecture) => {

    return `
    
    const findAll = async () => {
        return [];
    };

    const findById = async (id) => {
        return {};
    };

    const create = async (data) => {
        return {};
    };

    const update = async (id, data) => {
        return {};
    };

    const remove = async (id) => {
        return {};
    };

    module.exports ={findAll ,findById ,create ,update , remove}
    
    `
}