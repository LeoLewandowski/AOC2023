module.exports = {
    desc: 'Hot springs',
    execute(input) {
        let lengths = [], springs = [];
        input.split('\r\n').forEach(line => {
            let lengthsLine = line.split(' ');
            let springsLine = lengthsLine.shift();
            lengthsLine = lengthsLine[0].split(',').map(n => parseInt(n));

            let possibleSpaces = Array.from(springsLine.matchAll(/\?/g)).map(x => x.index);
            let springsToPlace = lengthsLine.reduce((a,c) => a += c) - (springsLine.match(/#/g)?.length || 0);

            placeSpring(springsLine, lengthsLine, possibleSpaces, springsToPlace);
        });
        
        let totalPart1 = total;
        total = 0;

        input.split('\r\n').forEach(line => {
            let lengthsLine = line.split(' ');
            let springsLine = (lengthsLine.shift() + '?').repeat(5);
            springsLine = springsLine.slice(0, springsLine.length - 1);
            lengthsLine = (lengthsLine[0] + ',').repeat(5).split(',').filter(x => x).map(n => parseInt(n));
            
            console.log(lengthsLine, springsLine);

            let possibleSpaces = Array.from(springsLine.matchAll(/\?/g)).map(x => x.index);
            let springsToPlace = lengthsLine.reduce((a,c) => a += c) - (springsLine.match(/#/g)?.length || 0);

            placeSpring(springsLine, lengthsLine, possibleSpaces, springsToPlace);
        });

        return [totalPart1, total];
    }
}

let total = 0;

function isValidRow(springs, lengths) {
    let match = springs.match(/[#]+/g);
    if (lengths.length != match.length) return false;
    for (let i = 0; i < lengths.length; i++) {
        if (match[i].length != lengths[i]) return false;
    }
    return total++;
}

function placeSpring(springs, lengths, possibleSpaces, springsToPlace) {
    if(springsToPlace == 0) return isValidRow(springs, lengths);
    while(possibleSpaces.length && possibleSpaces.length >= springsToPlace){
        let space = possibleSpaces.shift();
        // console.log(springs.slice(0,space) + '#' + springs.slice(space + 1), possibleSpaces, springsToPlace - 1);
        placeSpring(springs.slice(0,space) + '#' + springs.slice(space + 1), lengths, [...possibleSpaces], springsToPlace - 1);
    }
}