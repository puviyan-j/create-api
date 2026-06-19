import type { Module, Language, Architecture } from "../../../../types/answers.js";

export function generateservices(module: Module, language: Language, architecture: Architecture, name: string) {

    if (module === "commonjs") return cjs(architecture, name);

    return esm(architecture, language, name)

}

const esm = (architecture: Architecture, language: Language, name: string) => {

    return `
    import * as ${name}Repository from ${architecture === 'mvc' ? `'../repositorys/${name}.repository.js'` : `'./${name}.repository.js'`};

    export const get${name}s = async () => {
        return await ${name}Repository.findAll();
    };

    export const get${name}ById = async (id) => {
        return await ${name}Repository.findById(id);
    };

    export const create${name} = async (data) => {
        return await ${name}Repository.create(data);
    };

    export const update${name} = async (id, data) => {
        return await ${name}Repository.update(id, data);
    };

    export const delete${name} = async (id) => {
        return await ${name}Repository.remove(id);
    };
`
}

const cjs = (architecture: Architecture, name: string) => {

    return `
    const ${name}Repository = require(${architecture === 'mvc' ? "'../repositorys/user.repository'" : "'./user.repository'"});
    
    const get${name} = async () => {
        return await ${name}Repository.findAll();
    };

    const get${name}ById = async (id) => {
        return await ${name}Repository.findById(id);
    };

    const create${name} = async (data) => {
        return await ${name}Repository.create(data);
    };

    const update${name} = async (id, data) => {
        return await ${name}Repository.update(id, data);
    };

    const delete${name} = async (id) => {
        return await ${name}Repository.remove(id);
    };

    module.exports = { get${name}s ,get${name}ById, create${name}, update${name}, delete${name} }
    `

}