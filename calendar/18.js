const { floodFill, shoeLace } = require("../util");

module.exports = {
    desc:'Lavaduct Lagoon',
    execute(input) {
        let data = input.split('\r\n').map(l => {
            let line = l.split(' ');
            line[1] = parseInt(line[1]);
            line[2] = line[2].replace(/(\(#|\))/g,'');
            return line;
        });
        let Coords = [[0,0]];
        let newPos = Coords[Coords.length - 1], Width = 0, Height = 0, WOffset = Infinity, HOffset = Infinity;

        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i][1]; j++){
                switch(data[i][0]) {
                    case 'R': newPos[0] += 1; break;
                    case 'L': newPos[0] -= 1; break;
                    case 'U': newPos[1] -= 1; break;
                    case 'D': newPos[1] += 1; break;
                }
                if(newPos[0] >= Width) Width = newPos[0] + 1;
                else if(newPos[0] < WOffset) WOffset = newPos[0];
                if(newPos[1] >= Height) Height = newPos[1] + 1;
                else if(newPos[1] < HOffset) HOffset = newPos[1];
                Coords.push([...newPos]);
            }
        }

        let map = [];
        for(let i = 0; i < Height - HOffset; i++) map.push(new Array(Width - WOffset).fill('.',0,Width - WOffset));

        for(let pos of Coords){
            map[pos[1] - HOffset][pos[0] - WOffset] = '#';
        }

        const newMap = floodFill(map,[Math.ceil(map[0].length / 2),Math.ceil(map.length / 2)],'#');
        var perimeter = 0;
        Coords = [];
        newPos = [0,0];
        // console.log(newMap.map(l => l.join('')).join('\n'));

        for(let i = 0; i < data.length; i++) {
            let distance = parseInt(data[i][2].slice(0,data[i][2].length - 1),16), dir = data[i][2][data[i][2].length - 1];
            switch(dir) {
                case '0': newPos[0] += distance; break;
                case '1': newPos[1] += distance; break;
                case '2': newPos[0] -= distance; break;
                case '3': newPos[1] -= distance; break;
            }
            perimeter += distance;
            Coords.push([...newPos]);
        }

        return [newMap.reduce((a,l) => a += l.reduce((b,c) => b += (c.includes('#') ? 1 : 0),0),0),shoeLace(Coords) + (perimeter / 2) + 1];
    }
}