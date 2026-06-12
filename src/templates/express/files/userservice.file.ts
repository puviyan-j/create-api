import type { Module, Language, Architecture } from "../../../types/answers.js";

export function generateUserservices(module: Module, language: Language, architecture: Architecture) {

    if (module === "commonjs") return cjs(architecture);

    return esm(architecture, language)

}

const esm = (architecture:Architecture,language:Language) => {

    return `
    
    import * as userRepository from ${architecture === 'mvc' ? "'../repository/user.repository.js'" : "'./user.repository.js'"};

    export const getUsers = async () => {
        return await userRepository.findAll();
    };

    export const getUserById = async (id) => {
        return await userRepository.findById(id);
    };

    export const createUser = async (data) => {
        return await userRepository.create(data);
    };

    export const updateUser = async (id, data) => {
        return await userRepository.update(id, data);
    };

    export const deleteUser = async (id) => {
        return await userRepository.remove(id);
    };`
}

const cjs = (architecture:Architecture) => {

    return`
    const userRepository = require(${architecture === 'mvc' ? "'../repositorys/user.repository.js'" : "'./user.repository.js'"});
    
    const getUsers = async () => {
        return await userRepository.findAll();
    };

    const getUserById = async (id) => {
        return await userRepository.findById(id);
    };

    const createUser = async (data) => {
        return await userRepository.create(data);
    };

    const updateUser = async (id, data) => {
        return await userRepository.update(id, data);
    };

    const deleteUser = async (id) => {
        return await userRepository.remove(id);
    };

    module.export = { getUsers, getUserById, createUser, updateUser, deleteUser }`

}