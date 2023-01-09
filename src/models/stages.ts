import { StageInterface } from "../interfaces/stages.interface"
import { filePathValidator, searchTermValidator } from "../validators/validations"

const inputFile : StageInterface = {
    message: "Provide a text file to search from : ",
    inputError: `The provided file is not a valid text file.`,
    processError: `The provided file can't be read`,
}

const searchTerm : StageInterface = {
    message: "Provide a search term : ",
    inputError: `The search term is not valid, please provide a valid search term.`,
    processError: `The provided term is not present in the file.`,
}

export const stages = [inputFile, searchTerm]