import fs from "fs";
import { utils } from "../common";

export const filePathValidator = (input: string) : boolean => {
    const output = input.trim().split(' ')[0].toLowerCase();
    if (output.split('.')[1] !== "txt") throw new Error(`Only text files are supported : ${input}`);
    if (!fs.existsSync(input)) throw new Error(`Can't find the file : ${input}`)
    return true;
}

export const searchTermValidator = (input: string): boolean => {
    if (input.length < 3) return false;
    return true;
}

export const sanitise = (input: string): string => {
    const output = input.trim().split(' ')[0].toLowerCase().replace(/[^a-zA-Z0-9' ]/g, '');
    return output;
}

export const jsonFilePath = (input: string): string => {
    if (!input || input === '') throw new Error('provide a proper file name')
    const filename = utils.last(input.split('/')).split('.')[0];
    return `${filename}.json`
}