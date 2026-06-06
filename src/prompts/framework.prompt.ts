import {select} from '@inquirer/prompts';

export async function frameworkPrompt(){
    return select(
        {
            message:'Select framework',
            choices:[
                {name:'Express',value:'express'},
                {name:'Nest',value:'nest'}
            ]
        })
}