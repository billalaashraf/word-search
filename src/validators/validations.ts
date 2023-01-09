export const filePathValidator = (input: string) : boolean => {
    const output = input.trim().split(' ')[0].toLowerCase();
    if (output.split('.')[1] !== "txt") return false;
    return true;
}

export const searchTermValidator = (input: string): boolean => {
    if (input.length < 3) return false;
    return true;
}

export const sanitise = (input: string): string => {
    const output = input.trim().split(' ')[0].toLowerCase().replace(/[^a-zA-Z0-9' ]/g, '');
    return output;
}