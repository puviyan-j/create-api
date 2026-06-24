#!/usr/bin/env node

import { add, run } from "../src/index.js";
import { generator } from "../src/index.js";
import { Command } from "commander"


const program = new Command();

program
    .name('api-cli')
    .description('API Starter CLI')
    .version('1.0.6');

program
    .command('create', { isDefault: true })
    .alias('c')
    .action(() => { run(); });

program
    .command("generate <type> <name>")
    .alias('g')
    .option('--crud')
    .action((type,name, options) => {
        const data = { type,name, ...options };
        console.log(data)
        generator(data)
    });

program
    .command('add [features...]')
    .alias('a')
    .action((features) => {
        console.log(features);
        add(features)
    })

program.parse();