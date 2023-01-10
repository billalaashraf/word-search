import e, { Request, Response } from "express"
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
        response.status(404).send("Please include file and term.");
        return;
    }
    try {
        const inmemory = query["inmemory"];
        const filename = query["file"].toString();
        const term = sanitise(query["term"].toString());

        let data: any;
        if (inmemory) {
            const buffer = LoadFileInMemory(filename);
            data = await searchFromFile(filename, term, buffer)
        } else {
            data = await streamReader(filename, term)
        }
        if (JSON.stringify(data) === "{}") {
            response.status(403).send(`Term :: ${term} is not found in the document provided.`);
            return;
        }
        response.send(data)
    } catch (error) {
        console.log(error)
        response.status(500);
    }
}
