import fs from "fs";
import { sanitise } from "../validators/validations";

export const FileReaderByLine = async (line: string, term: string): Promise<string> => {
    const answer = await finder(line, term);
    return answer
}

export const FileReaderbyMemory = async (term: string, data: string): Promise<string[]> => {
    const lines = data.split("\n");
    const occurances = [];
    for (const line of lines) {
        const occurance = await finder(line, term);
        if (occurance) occurances.push(occurance)
    }
    return occurances;
}

export const LoadFileInMemory = (path: string): string => {
    try {
        const content = fs.readFileSync(path, "utf8")
        return content.toString();
    } catch (error) {
        console.log(error)
    }
}

const finder = async (line: string, term: string): Promise<string> => {
    let rt: string;
    const array = line.split(' ');
    const index = array.findIndex((element) => {
        return sanitise(element) === term;
    })
    if (index > -1) {
        const value = array.at(index);
        const before = array.slice(0, index).slice(-3).join(' ');
        const after = array.slice(index + 1, index + 4).join(' ');
        rt = `${before} ${value} ${after}`;
        console.info(`${rt} \n`)
    }
    return rt;
}