import data from './data'
let arrayOfGameStrings = data.split('\n') as Array<string>

const games = () => {
    return arrayOfGameStrings.map((game, index) => {
        const data = game.replace(`Game ${index + 1}: `, "")
        return {
            game: index + 1,
            rounds: data.split("; ").map((round, index) => {
                const newSet = Object.fromEntries(round.split(', ').map(set => set.split(" ").reverse()))
                return {
                    round: index + 1,
                    set: newSet
                }
            })
        }
    })
}

const maxValues = {
    red: 12,
    green: 13,
    blue: 14
} as any

const validGames = games().map((game, index) => {
    let gameIsValid = true
    game.rounds.forEach((round) => {
        for (const set in round.set) {
            if (Number(round.set[set]) > maxValues[set]) {
                gameIsValid = false
            }
        }
    })
    return gameIsValid ? index + 1 : 0
})

const totalValue = validGames.reduce((first, next) => {
    return first + next
})

console.log(totalValue)

const setPowers = games().map((game) => {
    const minValues = {
        red: 0,
        green: 0,
        blue: 0,
    } as any
    game.rounds.forEach((round) => {
        for (const set in round.set) {
            if (Number(round.set[set]) > minValues[set]) {
                minValues[set] = Number(round.set[set])
            }
        }
    })
    return minValues.red * minValues.green * minValues.blue
})

const sumOfPowers = setPowers.reduce((first, next) => {
    return first + next
})

console.log(sumOfPowers)