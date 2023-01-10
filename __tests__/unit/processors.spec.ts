import fs from "fs";
import { FileReaderByLine, FileReaderbyMemory, LoadFileInMemory } from "../../src/processors";

describe('Test Processros', () => {
    xit("FileReaderByLine() returns the occurance for the given term in the line", async () => {
        const line = "This is a test line containing the term chupacabra";
        const term = "chupacabra";
        const occurance = "containing the term chupacabra ";

        const result = await FileReaderByLine(line, term);

        expect(result).toEqual(occurance);
    });

    xit("FileReaderbyMemory() returns all occurances for the given term in the data", async () => {
        const data = "This is a test line containing the term chupacabra\nThis is a is once more the same term chupacabra";
        const term = "chupacabra";
        const occurances = ["containing the term chupacabra ", "the same term chupacabra "];

        const result = await FileReaderbyMemory(term, data);

        expect(result).toEqual(occurances);
    });

    xit("LoadFileInMemory() loads file content in memory", async () => {
        const fileName = 'test.txt'
        const fileContent = 'This is a test file'
        fs.writeFileSync(fileName, fileContent)

        const result = LoadFileInMemory(fileName);
        expect(result).toEqual(fileContent);

        // Clean up by removing the file after the test
        fs.unlinkSync(fileName);
    });
})