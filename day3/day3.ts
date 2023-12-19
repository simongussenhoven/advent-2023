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

stringArrays.forEach((str: string, rowIndex: number) => {
    for (let i = 0; i < str.length; i++) {
        if (isNumber(str[i])) {
            const fullNum = getFullNumber(str, i);
            checkForSymbols(rowIndex, i, fullNum)
            i = i + fullNum.length
        }
    }
})

const isGear = (str: string) => {
    return str === "*"
}

const getFullNum = (row: number, char: number) => {
    let stringNum = stringArrays[row][char];
    let startIndex = 0;
    let endIndex = 0;
    for (let charIndex = char + 1; charIndex <= stringArrays[row].length; charIndex++) {
        if (isNumber(stringArrays[row][charIndex])) {
            stringNum = stringNum + stringArrays[row][charIndex];
        } else {
            endIndex = charIndex
            break;
        }
    }
    for (let charIndex = char - 1; charIndex >= 0; charIndex--) {
        if (isNumber(stringArrays[row][charIndex])) {
            stringNum = stringArrays[row][charIndex] + stringNum;
        } else {
            startIndex = charIndex
            break;
        }
    }
    return {
        num: stringNum,
        startIndex,
        endIndex,
    }
}


const getGearNumbers = (charIndex: number, rowIndex: number) => {
    const numPairs = [] as any
    for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
        if (stringArrays[row]) {
            for (let char = charIndex - 1; char <= charIndex + 1; char++) {
                if (stringArrays[row][char]) {
                    if (isNumber(stringArrays[row][char])) {
                        const fullNum = getFullNum(row, char)
                        char = fullNum.endIndex
                        numPairs.push(fullNum.num)
                    }
                }
            }
        }
    }
    return numPairs
}

const nums = [] as any
stringArrays.forEach((str: string, rowIndex) => {
    for (let charIndex = 0; charIndex <= str.length; charIndex++) {
        if (isGear(str[charIndex])) {
            nums.push(getGearNumbers(charIndex, rowIndex))
        }
    }
})

console.log('part 1')
console.log(numbersWithSymbols.reduce((prev: any, next: any) => Number(prev) + Number(next)))

const numPairs = nums.filter((num: any) => num.length > 1)
const numPairValues = numPairs.map((num: any) => Number(num[0]) * Number(num[1]))

console.log('part 2')
console.log(numPairValues.reduce((prev: any, next: any) => Number(prev) + Number(next)))




