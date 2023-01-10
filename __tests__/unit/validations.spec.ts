import fs from "fs";
import { filePathValidator, jsonFilePath, sanitise, searchTermValidator } from "../../src/validators/validations";

describe('Test Validations', () => {
    it("filePathValidator() returns true for valid file path", () => {
        const path = "test.txt";
        fs.writeFileSync(path, "This is a test file.");

        const result = filePathValidator(path);

        expect(result).toBe(true);
        fs.unlinkSync(path);
    });

    it("filePathValidator() throws error for non-existing file", () => {
        const path = "test.txt";
        expect(() => { filePathValidator(path); }).toThrowError(`Can't find the file : ${path}`);
    });

    it("filePathValidator() throws error for non-txt file", () => {
        const path = "test.pdf";
        expect(() => { filePathValidator(path); }).toThrowError(`Only text files are supported : ${path}`);
    });

    it("searchTermValidator() returns true for valid input", () => {
        const validInput = "test";
        const result = searchTermValidator(validInput);
        expect(result).toBe(true);
    });

    it("searchTermValidator() returns false for invalid input", () => {
        const invalidInput = "te";
        const result = searchTermValidator(invalidInput);
        expect(result).toBe(false);
    });

    it('Sanitise function test with special characters', () => {
        const input = "   some #$Input With Various@ Characters! ";
        const expectedOutput = "some";
        const output = sanitise(input);
        expect(output).toBe(expectedOutput);
    });

    it('Sanitise function test with digits', () => {
        const input = "   initial Input123 With Various Characters! ";
        const expectedOutput = "initial";
        const output = sanitise(input);
        expect(output).toBe(expectedOutput);
    });

    it('jsonFilePath function test', () => {
        const input = "./src/data/sample.csv";
        const expectedOutput = "sample.json";
        const output = jsonFilePath(input);
        expect(output).toBe(expectedOutput);
    });

    it('jsonFilePath function test with empty input', () => {
        const input = "";
        expect(() => jsonFilePath(input)).toThrowError("provide a proper file name")
    });

})