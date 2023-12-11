module.exports = {
    desc:'Pipes',
    execute(input) {
        field, floodField = [];
        var counter = 1;
        let pos = [-1, -1], diff = [1,0], previousPos;

        field = input.split('\r\n').map(l => {
            if(pos[0] < 0){
                pos[0] = l.indexOf('S')
                pos[1]++;
            }
            return l.split('');
        });

        for(let i = 0; i < field.length; i++) {
            let l = [];
            for(let j = 0; j < field[0].length; j++) l.push('.');
            floodField.push(l);
        }

        previousPos = [...pos];
        if(pos[0] < field[0].length - 1 && getPipe([pos[0] + 1, pos[1]]).match(/[-J7]/)) pos[0]++;
        else if(pos[0] > 0 && getPipe([pos[0] - 1, pos[1]]).match(/[-FL]/)) pos[0]--;
        else if(pos[1] < field.length - 1 && getPipe([pos[0], pos[1] + 1]).match(/[|JL]/)) pos[1]++;
        else if(pos[1] > 0 && getPipe([pos[0], pos[1] - 1]).match(/[|F7]/)) pos[1]--;
        setCell(pos, getPipe(pos));

        while(getPipe(pos) != 'S'){
            diff = [pos[0] - previousPos[0], pos[1] - previousPos[1]];
            previousPos = pos;
            pos = getNextNeighbor(pos,diff);
            setCell(pos, getPipe(pos));
            counter++;
        }

        const middlePos = [Math.floor(field[0].length/2),Math.floor(field.length/2)];

        printField();
        console.log(getPipe(middlePos));
        floodFill(middlePos);
        printField();

        return [counter / 2,floodField.reduce((a,c) => a += c.reduce((b,d) => b += (d == '.X' ? 1 : 0),0),0)];
    }
}

let field, floodField = [];

function getNextNeighbor(pos, diff){
    switch(getPipe(pos)){
        case '|':
            return [pos[0], pos[1] + (diff[1] > 0 ? 1 : -1)];
        case '-':
            return [pos[0] + (diff[0] > 0 ? 1 : -1), pos[1]];
        case 'F':
            return diff[0] < 0 ? [pos[0], pos[1] + 1] : [pos[0] + 1, pos[1]];
        case '7':
            return diff[0] > 0 ? [pos[0], pos[1] + 1] : [pos[0] - 1, pos[1]];
        case 'J':
            return diff[0] > 0 ? [pos[0], pos[1] - 1] : [pos[0] - 1, pos[1]];
        case 'L':
            return diff[0] < 0 ? [pos[0], pos[1] - 1] : [pos[0] + 1, pos[1]];
    }
}

function getPipe(pos,f = field){
    if(pos[0] < 0
        || pos[0] > f[0].length - 1
        || pos[1] < 0
        || pos[1] > f.length - 1) return '';
    return f[pos[1]][pos[0]];
}

let i = 0;

function floodFill(pos,fromUp,fromLeft){
    var p = getPipe(pos,floodField);
    i++;
    // console.log(i, pos, p);
    if(pos[0] < 0
        || pos[0] > field[0].length - 1
        || pos[1] < 0
        || pos[1] > field.length - 1
        || p.includes('X')
        || p.includes('S')
        ) return;
    
    floodField[pos[1]][pos[0]] += 'X';

    if(p != '|' && p != 'J' && p != '7') floodFill([pos[0] + 1, pos[1]]);
    if(p != '|' && p != 'L' && p != 'F') floodFill([pos[0] - 1, pos[1]]);
    if(p != '-' && p != 'J' && p != 'L') floodFill([pos[0], pos[1] + 1]);
    if(p != '-' && p != 'F' && p != '7') floodFill([pos[0], pos[1] - 1]);

    return;
}

function setCell(pos, value){
    floodField[pos[1]][pos[0]] = value;
}

function printField(){
    let s = '';
    for(let i = 0; i < floodField.length; i++){
        for(let j = 0; j < floodField[0].length; j++){
            let p = getPipe([j,i],floodField);
            if(i == field.length/2 && j == field[0].length/2) s += '\x1b[35m';
            else if(p.match(/[J7LF|-]/)) s += '\x1b[32m';
            else if(p.includes('S')) s += '\x1b[31m';
            if(p.includes('X') /*&& !p.match(/[J7LF|-]/)*/) s += '\x1b[100m';
            s += p[0] + '\x1b[0m';
        }
        s += '\n';
    }
    console.log(s.replace(/F/g,'┌').replace(/J/g,'┘').replace(/7/g,'┐').replace(/L/g,'└').replace(/-/g,'─').replace(/\|/g,'│'));
}