#!/usr/bin/env node

import readline from "readline";
import { stages } from "./models/stages";
import { filePathValidator, sanitise } from "./validators/validations";
import { program } from "@caporal/core";

const reader = readline.createInterface({
    input:process.stdin, output: process.stdout
})
let state = stages[0]; 

program
.argument("<file>", "Text file, that needs to be processed", {
    validator: (value) => {
        if (!value || !filePathValidator(value.toString())) {
            setTimeout(() => process.exit(), 500)
            throw Error("file input is required, only txt files are supported.")
        }
        return value;
    }
},)
.action(({ logger, args }) => {
    logger.info("Reading: %s!", args.file);
    readFromScreen("input search term: ")
});

program.run()

async function readFromScreen(print:string) {
    reader.question(print, (input) => {
        if (sanitise(input) === 'letsquit') process.exit()
        reader.write(`your input >> ${input} \n`);
        readFromScreen("input search term: ")
    })
}
