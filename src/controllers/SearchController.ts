import { Request, Response } from "express"
import path from "path";
import { LoadFileInMemory } from "../processors";
import { searchFromFile, streamReader } from "../readers";
import { sanitise } from "../validators/validations";

export const SearchController = {
    get: (req, res) => {
        processRequest(req, res)
    }
}

const processRequest = async (request: Request, response: Response) => {
    const query = request.query;
    if (Object.keys(query).length < 1 || !query["file"] || !query["term"]) {
        response.send("Please include file and term.")
    }
    try {
        const inmemory = query["inmemory"];
        const filename = query["file"].toString();
        const term = sanitise(query["term"].toString());
        let data: any;

        if (inmemory) {
            const buffer = LoadFileInMemory(filename.toString());
            data = await searchFromFile(filename, term, buffer)
        } else {
            data = await streamReader(filename, term)
        }
        response.send(data)
    } catch (error) {
        console.error(error)
    }
}
