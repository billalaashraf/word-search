import fs from "fs";
import { searchFromFile, streamReader } from "../../src/readers";

describe('Test Readers', () => {
    it("streamReader() returns all occurances for the given term in the file", async () => {
        const path = "test.txt";
        const term = "chupacabra";
        const occurances = ["containing the term chupacabra "];
        fs.writeFileSync(path, occurances[0]);
    
        const result = await streamReader(path, term);
        expect(result).toEqual({ [term]: occurances });
        fs.unlinkSync(path);
    });

    test("searchFromFile() returns all occurances for the given term in the file", async () => {
        const path = "test-db.json";
        const term = "chupacabra";
        const file = "This is a test line containing the term chupacabra";
        const occurances = ["containing the term chupacabra "];
    
        const result = await searchFromFile(path, term, file);
        expect(result).toEqual({ [term]: occurances });
    });
})