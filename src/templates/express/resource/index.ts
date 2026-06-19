import fs from "fs-extra"
import type { Answers, Architecture, Module } from "../../../types/answers.js";
import type { ResourceGenerator } from "../../../types/generators.js";
import { generatecontroller } from "./files/controller.file.js";
import { generateRepository } from "./files/repository.file.js";
import { generateservices } from "./files/service.file.js";
import { generateroutes } from "./files/router.file.js";

export function getprojectdetails(): Answers {
    try {
        const data = fs.readJSONSync(".api-starter-cli.json");
        return data
    } catch (error) {
        throw { message: "app.json not found" }
    }

};

export async function generatemodule(answer: Answers, data: ResourceGenerator) {

    const ext = answer.language === "javascript" ? ".js" : ".ts";

    let files: { path: string, content: Function }[] = []

    if (answer.architecture === "mvc") {
        files = mvc(data, ext)
    };
    if (answer.architecture === "feature") {
        files = future(data, ext)
    }

    for (let file of files) {
        await fs.ensureFile(file.path);
        const content = data.crud ? file.content(answer.module, answer.language, answer.architecture, data.name) : ""
        await fs.writeFile(file.path, content)

    }
}



const mvc = (data: ResourceGenerator, ext: ".js" | ".ts") => {

    return [
        { path: `src/repositorys/${data.name}.repository${ext}`, content: generateRepository },
        { path: `src/service/${data.name}.service${ext}`, content: generateservices },
        { path: `src/controller/${data.name}.controller${ext}`, content: generatecontroller },
        { path: `src/routes/${data.name}.routes${ext}`, content: generateroutes }
    ];

}

const future = (data: ResourceGenerator, ext: ".js" | ".ts") => {

    return [
        { path: `src/modules/${data.name}/${data.name}.repository${ext}`, content: generateRepository },
        { path: `src/modules/${data.name}/${data.name}.service${ext}`, content: generateservices },
        { path: `src/modules/${data.name}/${data.name}.controller${ext}`, content: generatecontroller },
        { path: `src/modules/${data.name}/${data.name}.routes${ext}`, content: generateroutes }
    ];

}
