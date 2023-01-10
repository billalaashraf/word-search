import fs from "fs";
import { createTermsDB, readTermsDB } from "../../src/parsers";

describe('Test Parsers', () => {
    xit("createTermsDB() creates a new JSON file with the given term and occurings", async () => {
        const file = 'test-terms-db.json';
        const term = 'test-term';
        const occurings = ['term1', 'term2', 'term3'];

        await createTermsDB(file, term, occurings);

        fs.readFile(file, (error, data) => {
            const entries = JSON.parse(data.toString());
            expect(entries).toEqual({ [term]: occurings });
        });
        // Clean up by removing the file after the test
        fs.unlinkSync(file);
    });

    xit("readTermsDB() returns the occurings for the given term in the database", async () => {
        const file = 'test-terms-db.json';
        const term = 'test-term';
        const occurings = ['term1', 'term2', 'term3'];

        await fs.writeFile(file, JSON.stringify({ [term]: occurings }), error => {
            if (error) throw error;
            const data = readTermsDB(file, term);
            expect(data).toEqual(occurings);
            // Clean up by removing the file after the test
            fs.unlinkSync(file);
        });
    });

})