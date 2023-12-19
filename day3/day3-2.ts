import data from './data-example'

let stringArrays = data.split('\n');

const isGear = (str: string) => {
    return str === "*"
}

const isNumber = (char: string) => {
    return !isNaN(Number(char))
}

const getFullNum = (rowIndex: number, charIndex: number) => {
    let numString = stringArrays[rowIndex][charIndex];
    console.log(numString)
}

const findAdjacentNums = (charIndex: number, rowIndex: number) => {
    const numCombis = [];
    for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
        console.log(`row${row}`)
        for (let char = charIndex - 1; char <= charIndex + 1; char++) {

            if (stringArrays[row][char] && isNumber(stringArrays[row][char])) {
                console.log(getFullNum(char, row))
            }
        }
    }
}

stringArrays.forEach((str, rowIndex) => {
    for (let i = 0; i <= str.length; i++) {
        if (isGear(str[i])) {
            findAdjacentNums(i, rowIndex)
        }
    }
})