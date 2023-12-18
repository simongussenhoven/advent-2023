import data from './data'

let stringArrays = data.split('\n');

const isNumber = (char: string) => {
    return !isNaN(Number(char))
}

const isSymbol = (char: string) => {
    if (char === ".") return false
    return !isNumber(char)
}

const getFullNumber = (str: string, i: number) => {
    let numString = ""
    for (let x = i; x <= str.length; x++) {
        if (isNumber(str[x])) numString = numString + str[x]
        else break;
    }
    return numString
}

const numbersWithSymbols = [] as any

// check surrounding chars for symbols
const checkForSymbols = (rowIndex: number, charIndex: number, fullNum: string) => {
    let hasSymbol = false;
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
        if (stringArrays[i]) {
            for (let x = charIndex - 1; x <= charIndex + fullNum.length; x++) {
                if (stringArrays[i][x] && isSymbol(stringArrays[i][x])) hasSymbol = true;
            }
        }
    }
    if (hasSymbol) numbersWithSymbols.push(fullNum)
}

// iterate every string in the array and get
// the full number when a number is found
stringArrays.forEach((str: string, rowIndex: number) => {
    for (let i = 0; i < str.length; i++) {
        if (isNumber(str[i])) {
            const fullNum = getFullNumber(str, i);
            checkForSymbols(rowIndex, i, fullNum)
            i = i + fullNum.length
        }
    }
})

console.log(numbersWithSymbols.reduce((prev: any, next: any) => {
    return Number(prev) + Number(next)
}))




