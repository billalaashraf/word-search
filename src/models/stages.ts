import { filePathValidator, searchTermValidator } from "../validators/validations"

export const stages = {
    inputFile : {
        message: "Provide a text file to search from : ",
        inputError: `The provided file is not a valid text file.`,
        processError: `The provided file can't be read`,
        vaidate: filePathValidator,
    },
    searchTerm : {
        message: "Provide a search term : ",
        inputError: `The search term is not valid, please provide a valid search term.`,
        vaidate: searchTermValidator,
    }
}