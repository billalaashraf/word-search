import fs from "fs";
import { jsonFilePath } from "../validators/validations";

export const createTermsDB = async (file: string, term: string, occurings: string[]) => {
    let data = readJsonFile(file) || {};
    data[term] = occurings;

    const jsonString = JSON.stringify(data);
    const jfile = jsonFilePath(file)
    fs.writeFile(jfile, jsonString, error => {
        if (error) throw error;
    })
}

export const readTermsDB = (file: string, term: string): string[] => {
    try {
        let data = readJsonFile(file)
        if (data && data[term]) {
            return data[term];
        }
    } catch (error) { }
    return [];
}

const readJsonFile = (file: string): any => {
    const jfile = jsonFilePath(file)
    try {
        const jsonString = fs.readFileSync(jfile, 'utf8');
        const entries = JSON.parse(jsonString);
        return entries;
    } catch (error) { return; }
}