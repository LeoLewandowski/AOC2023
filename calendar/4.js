module.exports = {
    desc: 'Scratchcards',
    execute(string) {
        totalCards = 0;
        var cardPile = string.split('\r\n');
        let total = 0;

        for (let i = 0; i < cardPile.length; i++) {
            var line = cardPile[i], nextCards = 0;
            const numbers = line.replace(/Card +[0-9]+: /, '').split(' | ').map(l => l.split(' ').filter(x => x));
            
            for (let n of numbers[0]) {
                if (numbers[1].includes(n)) nextCards++;
            }
            if (nextCards) total += Math.pow(2,nextCards-1);
            
            Cards.set(i, nextCards);
        }

        for(let j = 0; j < cardPile.length; j++) getCards(j);

        return [total,totalCards];
    }
}

var totalCards = 0;

/**
 * 
 * @param {number} id 
 * @returns number[]
 */
function getCards(id) {
    totalCards++;
    for(let i = 1; i <= Cards.get(id); i++) getCards(id + i);
    return;
}

/** @type {Map<number,number>}*/
const Cards = new Map();