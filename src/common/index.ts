export const utils = {
    last: (arr: any[]): any => {
        return arr[arr.length - 1];
    },
    
    print: (arr: any[]) => {
        for (let item of arr) {
            console.log(item)
        }
    }
}