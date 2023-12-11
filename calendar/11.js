module.exports = {
    desc:'galaxies',
    execute(input){
        isDoubleColumn = [];
        isDoubleRow = [];
        let totalDistance = 0, totalDistance2 = 0, sky = input.split('\r\n').map((l,y) => {
            isDoubleRow[y] = !l.includes('#');
            return l.split('').map((s,x) => {
                if(isDoubleColumn[x] == undefined) isDoubleColumn[x] = true;
                isDoubleColumn[x] = isDoubleColumn[x] && (s == '.');
                return s;
            });
        });

        let galaxies = [];
        for(let x = 0; x < sky[0].length; x++) for(let y = 0; y < sky.length; y++) if(sky[y][x] == '#') galaxies.push([x,y]);

        for(let i = galaxies.length - 1; i > 0; i--) for(let j = 0; j < i; j++){
            totalDistance += distance(galaxies[j],galaxies[i]);
            totalDistance2 += distance(galaxies[j],galaxies[i],true);
        }

        return [totalDistance,totalDistance2];
    }
}

let isDoubleColumn, isDoubleRow;

const expansionVar = 1000000;

function distance(pos1,pos2,part = false){
    let colCount = 0, rowCount = 0;
    for(let i = Math.min(pos1[0],pos2[0]); i < Math.max(pos1[0],pos2[0]); i++){
        if(isDoubleColumn[i] && part) colCount += expansionVar;
        else if(isDoubleColumn[i]) colCount += 2;
        else colCount++;
    }
    for(let j = Math.min(pos1[1],pos2[1]); j < Math.max(pos1[1],pos2[1]); j++){
        if(isDoubleRow[j] && part) rowCount += expansionVar;
        else if(isDoubleRow[j]) rowCount += 2;
        else rowCount++;
    }
    return rowCount + colCount;
}