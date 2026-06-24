import fs from "fs-extra"
import type { Answers, Architecture, Module } from "../../../types/answers.js";
import type { ResourceGenerator } from "../../../types/generators.js";
import { generatecontroller } from "./files/controller.file.js";
import { generateRepository } from "./files/repository.file.js";
import { generateservices } from "./files/service.file.js";
import { generateroutes } from "./files/router.file.js";
import { generatetypes } from "./files/type.file.js";



export async function generatemodule(answer: Answers, data: ResourceGenerator) {

    const ext = answer.language === "javascript" ? ".js" : ".ts";

    let files: { path: string, content: Function }[] = [];
    const havevalidation = answer.validation === "none" ? false : true

    if (answer.architecture === "mvc") {
        files = mvc(data, ext, havevalidation)
    };
    if (answer.architecture === "feature") {
        files = future(data, ext, havevalidation)
    }

    for (let file of files) {

        const isexist = await fs.exists(file.path);

        if (isexist) continue;

        await fs.ensureFile(file.path);

        if (!data.crud) continue;

        const content = file.content(answer.module, answer.language, answer.architecture, data.name);

        await fs.writeFile(file.path, content)

    }
}



const mvc = (data: ResourceGenerator, ext: ".js" | ".ts", havevalidation: boolean) => {

    const files = [
        { path: `src/repositorys/${data.name}.repository${ext}`, content: generateRepository },
        { path: `src/service/${data.name}.service${ext}`, content: generateservices },
        { path: `src/controller/${data.name}.controller${ext}`, content: generatecontroller },
        { path: `src/routes/${data.name}.routes${ext}`, content: generateroutes }
    ];

    if (ext === ".ts") files.push({ path: `src/types/${data.name}.types${ext}`, content: generatetypes });
    if (havevalidation) files.push({ path: `src/validations/${data.name}.validation${ext}`, content: generatetypes })



    return files;

}

const future = (data: ResourceGenerator, ext: ".js" | ".ts", havevalidation: boolean) => {

    const files = [
        { path: `src/modules/${data.name}/${data.name}.repository${ext}`, content: generateRepository },
        { path: `src/modules/${data.name}/${data.name}.service${ext}`, content: generateservices },
        { path: `src/modules/${data.name}/${data.name}.controller${ext}`, content: generatecontroller },
        { path: `src/modules/${data.name}/${data.name}.routes${ext}`, content: generateroutes }
    ];

    if (ext === ".ts") files.push({ path: `src/modules/${data.name}/${data.name}.types${ext}`, content: generatetypes })
    if (havevalidation) files.push({ path: `src/modules/${data.name}/${data.name}.validation${ext}`, content: generatetypes })

    return files
}
