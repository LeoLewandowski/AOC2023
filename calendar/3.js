module.exports = {
    desc:'Gears & numbers',
    execute(string) {
        var sum = 0, gearPower = 0;
        const width = string.split('\n')[0].length + 1;

        Array.from(string.matchAll(/[0-9]+/gd), c => c).forEach(match => {
            let symbol = false, nb = parseInt(match[0]), geared = false;
            for(let i = match.indices[0][0]; i < match.indices[0][1]; i++){
                [[1,0], [0,1], [-1,0], [0,-1], [1,1], [-1,1], [-1,-1], [1,-1]].forEach(([x,y]) => {
                    let adjacent = string[i + x + y*width];
                    if(adjacent == '*' && !geared) {
                        geared = true;
                        let gear = Gears.get(i + x + y*width);
                        if(gear) gear.push(nb);
                        else Gears.set(i + x + y*width, [nb]);
                    }
                    if(adjacent && adjacent.match(/[^0-9.\n\r]/)) symbol = true;
                });
            }
            if(symbol) sum += nb;
        })
        for(let g of Gears.values()){
            if(g.length < 2) continue;
            let ratio = 1
            g.forEach(r => ratio *= r);
            gearPower += ratio
        }
        return [sum,gearPower];
    }
}

const Gears = new Map();