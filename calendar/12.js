module.exports = {
    desc:'Hot springs',
    execute(input) {
        let lengths = [], springs = [];
        input.split('\r\n').forEach(line => {
            let lengthsLine = line.split(' ');
            let springsLine = lengthsLine.shift();
            lengthsLine = lengthsLine[0].split(',').map(n => parseInt(n));
            isValidRow(springsLine,lengthsLine);
        });
        return [NaN,NaN];
    }
}

function isValidRow(springs,lengths){
    let emptySpaces = Array.from(springs.matchAll(/\?/g));
    let springsToPlace = lengths.reduce((a,c) => a+c) - springs.match(/#/g).length;
    console.log(springs, lengths, springsToPlace, emptySpaces);
}

function placeSpring(springs,lengths,springsToPlace){

}