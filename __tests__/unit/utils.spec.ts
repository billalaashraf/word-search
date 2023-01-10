import { utils } from "../../src/common";

xdescribe('Test utils functions',  () => {
    it("last() returns the last element of an array", () => {
        const arr = [1, 2, 3];
        expect(utils.last(arr)).toBe(3);
    });

    it("print() prints each element of an array", () => {
        const spy = jest.spyOn(console, 'log');
        const arr = [1, 2, 3];
        utils.print(arr);
        expect(spy).toHaveBeenCalledWith(`${1} \n`);
        expect(spy).toHaveBeenCalledWith(`${2} \n`);
        expect(spy).toHaveBeenCalledWith(`${3} \n`);
        spy.mockRestore();
    });
})