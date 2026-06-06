import {select} from '@inquirer/prompts';

export async function modulePrompt() {

    return select({
        message:'module',
        choices:[
            {name:'commonjs',value:'commonjs'},
            {name:'module',value:'modulejs'}
        ]
    })
    
}