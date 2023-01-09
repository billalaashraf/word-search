import { readTermsDB } from "../parsers";
import { sanitise } from "../validators/validations";

export const FileReaderByLine = async (line: string, term: string): Promise<string> => {

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

const finder = (line: string, term: string) : string => {
    return ""
}