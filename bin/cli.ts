#!/usr/bin/env node

import { run } from "../src/index.js";
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
    .command('generate')
    .alias('g')
    .description('Generate resources')
    .argument('<name>')
    .option('-c,--crud')
    .action((name, options) => {
        const data = { name, ...options };
        console.log(data)
        generator(data)
    });

program
    .command('add')
    .alias('a')
    .option('--swager')
    .action((options) => {
        console.log({ ...options })
    })

program.parse();