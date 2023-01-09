import readline from "readline";
import evetns from "events";
import fs from "fs";

import { sanitise } from "../validators/validations";
import { FileReaderByLine } from "../processors";
import { Config } from "../config";
import { createTermsDB, readTermsDB } from "../parsers";
import { utils } from "../common";

const reader = readline.createInterface({
    input: process.stdin, output: process.stdout
})

const streamReader = async (path: string, term: string) => {
    try {
        const dataExists = readTermsDB(path, term);
        if (dataExists.length > 0) {
            utils.print(dataExists)
        } else {
            const occurings = [];
            const reader = readline.createInterface({
                input: fs.createReadStream(path),
                crlfDelay: Infinity
            });

            reader.on('line', async (line) => {
                const occurance = await FileReaderByLine(line, term, path);
                if (occurance) occurings.push(occurance);
            })

            await evetns.once(reader, 'close')
            createTermsDB(path, term, occurings);

            if (Config.debug) {
                console.log('Reading file line by line with readline done.');
                const used = process.memoryUsage().heapUsed / 1024 / 1024;
                console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
            }
        }

    } catch (error) {
        throw error
    }
}

export async function readFromScreen(print: string, path: string = null) {
    reader.question(print, async (input) => {
        const sanitisedInput = sanitise(input)
        if (sanitisedInput === 'letsquit') process.exit();
        reader.write(`${input} \n`);
        try {
            await streamReader(path, sanitisedInput);
        } catch (error) {
            console.error(error);
            process.exit();
        }
        readFromScreen("input search term: ", path);
    })
}