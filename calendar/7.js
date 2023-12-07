const { TIMEOUT } = require("dns");

module.exports = {
    desc:'Camel cards',
    execute(string) {
        const hands = string.split('\r\n').filter(x => x).map(h => {
            let [a,b] = h.split(' ');
            return [a,parseInt(b)];
        });

        hands.sort((a,b) => {
            var d = getHandType(a[0]) - getHandType(b[0]);
            return (d ? d : compareHands(a[0],b[0]));
        });

        let total = 0;
        for(let i = 0; i < hands.length; i++) total += hands[i][1] * (i+1);

        Part = true;
        console.log('----------------PART 2---------------------')

        hands.sort((a,b) => {
            var d = getHandType(a[0]) - getHandType(b[0]);
            return (d ? d : compareHands(a[0],b[0]));
        });

        let secondTotal = 0;
        for(let i = 0; i < hands.length; i++) secondTotal += hands[i][1] * (i+1);

        return [total, secondTotal];
    }
}
let Part = false; // False for 1, true for 2

/**
 * Returns the given hand's type
 * @param {string} hand 
 */
function getHandType(hand,test = false){
    
    let cards = new Map(), jokers = 0;
    for(let i = 0; i < hand.length; i++){
        if(Part && hand[i] == 'J') {
            jokers++;
            continue;
        }
        let card = cards.get(hand[i]);
        cards.set(hand[i],card ? card + 1 : 1);
    }

    if(cards.size == 1 || jokers == 5) return 6;
    else if(cards.size == 4) return 1;
    else if(cards.size == 5) return 0;
    
    let arr = Array.from(cards.values()).sort();
    
    if(arr.length == 2 && arr[1] + jokers == 4) return 5;
    else if(arr.length == 2 && arr[1] + jokers == 3) return 4;
    else if(arr.length == 3 && arr[2] + jokers == 3) return 3;
    else if(arr.length == 3 && arr[2] + jokers == 2) return 2;
    throw new Error('Out of bounds !');
}

/**
 * Compares 2 hands of cards, to determine which is better
 * @param {string} h1 
 * @param {string} h2 
 */
function compareHands(h1, h2){
    for(let i = 0; i < h1.length; i++){
        let a = getCardRank(h1[i]), b = getCardRank(h2[i]);
        if(a - b) return a - b;
    }
    return 0;
}

/**
 * Get the numeric rank of a card
 * @param {string} card 
 * @returns {number}
 */
function getCardRank(card){
    switch(card){
        case 'J':
            if(Part) return 1;
            else return 11;
        case 'T': return 10;
        case 'Q': return 12;
        case 'K': return 13;
        case 'A': return 14;
        default: return parseInt(card);
    }
}