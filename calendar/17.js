const Util = require('../util');

module.exports = {
    desc: 'Clumsy Crucible',
    execute(input) {
        Sectors = input.split('\r\n').map(l => l.split('').map(n => parseInt(n)));
        Paths = [
            [[1,0], [1,0], 0, '', -Sectors[0][0]],
        ];

        while(Paths.length > 0) {
            NextPaths = [];
            for(let i = 0; i < Paths.length; i++) {
                nextCell(...Paths[i]);
            }
            Paths = NextPaths;
        }

        console.log(Ends);
        
        const table = Sectors.map(l => l.map(n => n.toString()));
        Ends.find(a => a[1] == Min)[0].split(';').filter(x => x).forEach(c => {
            let tmp = Util.unformatPosition(c);
            table[tmp[1]][tmp[0]] += 'X'
        });

        console.log(table);

        return [Min, NaN];
    }
}

async function nextCell(pos, dir, straightCount, path, score) {
    let f = Util.formatPosition(pos);

    if(Util.outOfBounds(pos,Sectors) || path.includes(f)) return;

    if(pos[0] === Sectors[0].length - 1 && pos[1] === Sectors.length - 1){
        Min = Math.min(Min, score);
        return Ends.push([path,score]);
    }
    
    path += f + ';';
    let dir1 = Util.rotate([...dir],'Clockwise'), dir2 = Util.rotate([...dir], 'Counterclockwise');
    straightCount++;
    score += Sectors[pos[1]][pos[0]];

    if(straightCount < 3) NextPaths.push([[pos[0] + dir[0], pos[1] + dir[1]], dir, straightCount, path, score]);
    NextPaths.push([[pos[0] + dir1[0], pos[1] + dir1[1]], dir1, (straightCount < 3 ? straightCount : 0), path, score]);
    NextPaths.push([[pos[0] + dir2[0], pos[1] + dir2[1]], dir2, (straightCount < 3 ? straightCount : 0), path, score]);
    
    return;
}

let Min = Infinity;
let Paths = [], NextPaths = [], Ends = [];
let Sectors;