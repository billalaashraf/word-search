#!/usr/bin/env node

import readline from "readline";

const reader = readline.createInterface({
    input:process.stdin, output: process.stdout
})

async function readFromScreen(print:string) {
    reader.question(print, (input) => {
        reader.write(`your input >> ${input} \n`);
        readFromScreen("Search term: \n")
    })
}

readFromScreen("Provide a text file to search \n");