import readline from "readline";
import evetns from "events";
import fs from "fs";

import { sanitise } from "../validators/validations";
import { FileReaderByLine, FileReaderbyMemory } from "../processors";
import { Config } from "../config";
import { createTermsDB, readTermsDB } from "../parsers";
import { utils } from "../common";

const reader = readline.createInterface({
    input: process.stdin, output: process.stdout
})

const printMemoryUsage = () => {
    if (Config.debug) {
        console.log('\nReading file line by line with readline done.');
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB \n`);
    }
}

const printFromJson = (path: string, term): any => {
    const dataExists = readTermsDB(path, term);
    if (dataExists && dataExists.length > 0) {
        utils.print(dataExists)
        return dataExists;
    }
    return null
}

const renderError = (occurings : string[], term: string) => {
    if (occurings.length < 1) {
        console.error(`\nTerm : ${term} is not found in following file.`)
    }
}

export const streamReader = async (path: string, term: string): Promise<any> => {
    let data = printFromJson(path, term)
    if (data === null) {
        data = {};
        const occurings = [];
        const reader = readline.createInterface({
            input: fs.createReadStream(path),
            crlfDelay: Infinity
        });

        reader.on('line', async (line) => {
            const occurance = await FileReaderByLine(line, term);
            if (occurance) occurings.push(occurance);
        })

        renderError(occurings, term);
        await evetns.once(reader, 'close')
        if (occurings.length > 0) {
            createTermsDB(path, term, occurings);
            data[term] = occurings
        }
        printMemoryUsage();
    }
    return data;
}

export const searchFromFile = async (path: string, term: string, file: string): Promise<any> => {

    let data = printFromJson(path, term)
    if (data === null) {
        data = {};
        const occurings = await FileReaderbyMemory(term, file)
        utils.print(occurings)
        if (occurings.length > 0) {
            createTermsDB(path, term, occurings);
            data[term] = occurings
        }
        renderError(occurings, term)
    }
    printMemoryUsage();
    return data;
}

export async function readFromScreen(print: string, path: string = null, buffer: string = null) {
    reader.question(print, async (input) => {
        const sanitisedInput = sanitise(input)
        if (sanitisedInput === 'letsquit') process.exit();
        reader.write(`${input} \n`);

        if (buffer) {
            await searchFromFile(path, sanitisedInput, buffer)
            readFromScreen("input search term: ", path, buffer);
        } else {
            try {
                await streamReader(path, sanitisedInput);
            } catch (error) {
                console.error(error);
                process.exit();
            }
            readFromScreen("input search term: ", path);
        }
    })
}