module.exports = {
    desc: 'Light beams',
    execute(input) {
        let ogContraption = input.split('\r\n').map(l => l.split(''));

        contraption = ogContraption.map(a => [...a]);

        for(let x = 0; x < ogContraption[0].length; x++) {
            let value = solve([x,-1],[0,1]);
            if(value > Max) Max = value;
            contraption = ogContraption.map(a => [...a]);

            value = solve([x,ogContraption.length],[0,-1]);
            if(value > Max) Max = value;
            contraption = ogContraption.map(a => [...a]);
        }

        for(let y = 0; y < ogContraption.length; y++) {
            let value = solve([-1,y],[1,0]);
            if(value > Max) Max = value;
            contraption = ogContraption.map(a => [...a]);

            value = solve([ogContraption[0].length,y],[-1,0]);
            if(value > Max) Max = value;
            contraption = ogContraption.map(a => [...a]);
        }

        return [solve([-1,0],[1,0]),Max];
    }
}

let Max = 0;
let Cache = new Map();

let contraption = [], positions = [], directions = [];
let nextPos = [], nextDirs = [];

function solve(ogPos, ogDir) {
    Cache.clear();
    positions = [ogPos];
    directions = [ogDir];

    while (positions.length > 0) {
        nextPos = [];
        nextDirs = [];

        for (let i = 0; i < positions.length; i++) {
            let pos = positions[i], dir = directions[i];
            pos[0] += dir[0];
            pos[1] += dir[1];

            if (outOfBounds(pos) || Cache.get(pos.toString() + dir.toString())) continue;

            nextPos.push([...pos]);

            Cache.set(pos.toString() + dir.toString(), true);

            contraption[pos[1]][pos[0]] += '#';
            newDir(pos, dir);
        }
        positions = nextPos;
        directions = nextDirs;
    }
    
    return contraption.reduce((t, l) => t += (l.reduce((a, c) => a += (c.includes('#') ? 1 : 0), 0)), 0);
}

function newDir(pos, dir) {
    switch (contraption[pos[1]][pos[0]][0]) {
        case '/':
            if (dir[1] != 0) return nextDirs.push(rotate(dir, 'Counterclockwise'));
            else return nextDirs.push(rotate(dir, 'Clockwise'));
        case '\\':
            if (dir[1] != 0) return nextDirs.push(rotate(dir, 'Clockwise'));
            else return nextDirs.push(rotate(dir, 'Counterclockwise'));
        case '-':
            if (dir[1] == 0) break;
            nextDirs.push(rotate([...dir], 'Clockwise'));
            nextDirs.push(rotate(dir, 'Counterclockwise'));
            return nextPos.push(pos);
        case '|':
            if (dir[1] != 0) break;
            nextDirs.push(rotate([...dir], 'Clockwise'));
            nextDirs.push(rotate(dir, 'Counterclockwise'));
            return nextPos.push(pos);
    }
    return nextDirs.push(dir);
}

/**
 * 
 * @param {number[]} dir 
 * @param {'Clockwise'|'Counterclockwise'} str 
 * @returns 
 */
function rotate(dir, str) {
    let tmp;
    switch (str) {
        case 'Clockwise':
            tmp = dir[0];
            dir[0] = dir[1];
            dir[1] = -tmp;
            break;
        case 'Counterclockwise':
            tmp = dir[0];
            dir[0] = -dir[1];
            dir[1] = tmp;
            break;
    }
    return dir;
}

function printContraption() {
    for (let i = 0; i < contraption.length; i++) {
        let s = '';
        for (let j = 0; j < contraption[0].length; j++) {
            if (contraption[i][j].includes('#')) s += '\x1b[32m' + contraption[i][j][0] + '\x1b[0m';
            else s += contraption[i][j];
        }
        console.log(s);
    }
}

function outOfBounds(pos) {
    return (pos[0] < 0 || pos[0] >= contraption[0].length || pos[1] < 0 || pos[1] >= contraption.length);
}