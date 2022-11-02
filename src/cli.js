#!/usr/bin/env node
const chalk = require('chalk');
const { markDownLinks } = require ('./index.js')
const { statsValidatelinks, statsLinks} = require ('./function.js')

const argv = process.argv 
const MDvalidate= process.argv[2]

function cli(MDvalidate, argv) {
    if (MDvalidate && argv === undefined) {
        console.log(chalk.blue('Please enter a valid path'));

    } else if (argv[3]=== '--stats' && argv[4]==='--validate' || argv[4]==='--stats' && argv[3]==='--validate') {
        (markDownLinks(MDvalidate, { validate: true }).then((response) => {
            // console.log(statsValidatelinks(response))
        })).catch(reject => {
            console.log(chalk.red(reject));
        })
    } else if (argv[3] ==='--validate') {
        (markDownLinks(MDvalidate, { validate: true }).then((response) => {
            console.log(response)
        })).catch(reject => {
            console.log((reject));
        })
    } else if (argv.length <= 3) {
        (markDownLinks(MDvalidate, { validate: false }).then((response) => {
            console.log(response)
        })).catch(reject => {
            console.log( reject);
        })
    } else if (argv[3] ==='--stats') {
        (markDownLinks(MDvalidate, { validate: true }).then((response) => {
            console.log(statsLinks(response))
        })).catch(reject => {
            console.log((reject));
        })
    }
    else if (argv !== '--stats' && argv !== '--validate' && argv !== undefined) {
        console.log(chalk.red("ERROR"));
    }

}

cli(MDvalidate, argv)