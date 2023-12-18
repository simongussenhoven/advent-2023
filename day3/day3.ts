import data from './data'

let array = data.split('\n').slice(1, 2);
const arrayOfCharArrays = array.map((arr) => {
    return arr.split("")
})

const isNumber = (char: string) => {
    return !isNaN(Number(char))
}

const getFullNumber = (arr: any, charI: number) => {
    let numberString = ""
    for (let i = charI; i <= arr.length; i++) {
        if (isNumber(arr[i])) {
            numberString = numberString += arr[i]
        }
        else {
            return {
                fullNum: Number(numberString),
                skipToIndex: numberString.length ?? 0
            }
        }
    }
}

// iterate every character
arrayOfCharArrays.forEach((arr, rowIndex) => {
    let skipToIndex = 0
    return arr.forEach((char, charIndex) => {
        if (char === ".") return
        if (!isNumber(char)) return
        if (charIndex < skipToIndex) return
        const fullNum = getFullNumber(arr, charIndex)
        skipToIndex = charIndex + fullNum!.skipToIndex
    })
})



