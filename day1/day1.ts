import data from './data'

let array = data.split('\n');

const numberNames = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
]

const replacedNumberWords = (): Array<string> => {
    return array.map((string: string) => {
        let newString = string;
        numberNames.forEach((numName: string, index: number) => {
            let toInsert = numName;
            toInsert = toInsert.slice(0, 1) + String(index + 1) + toInsert.slice(2);
            newString = newString.replace(new RegExp(numName, 'g'), toInsert);
        })
        return newString
    })
}

const arrayOfNumbers = () => {
    return replacedNumberWords().map((string: string) => {
        return string.replace(/\D/g, '')
    })
}

const twoNumberValues = () => {
    return arrayOfNumbers().map((string: string) => {
        if (!string.length) return 0;
        const first = string[0]
        const last = string[string.length - 1]
        return parseInt(first + last)
    })
}

const totalValue = () => {
    return twoNumberValues().reduce((acc, curr) => {
        return acc + curr
    }, 0)
}

console.log(totalValue())