const { log } = require("console");

module.exports = {
    desc: 'Test file',
    execute(string) {
        const lists = string.split(/.*-to-.*/g).slice(1).map(l => l.split('\r\n').filter(x => x).map(c => c.split(' ').filter(x => x).map(c => parseInt(c))).sort((a, b) => b[1] - a[1]));
        var ranges = string.match(/(?<=seeds: ).+/)[0].match(/[0-9]+ [0-9]+/g).map(r => r.split(' ').map(x => parseInt(x)));
        console.log(ranges);

        for (let list of lists) {
            let test = new Map();
            for (let line of list) {
                console.log('---------------------------------------\nline : ',line);
                for (let i = 0; i < ranges.length; i++) {
                    var res = overlappingRanges(ranges[i], line);
                    res.forEach(r => {
                        if(!(test.get(r[0]) >= r[1])){
                            test.set(r[0], r[1]);
                            test.delete(ranges[i][0]);
                        }
                    })
                    console.log(ranges[i], ' --> ', res, '\n');
                    ranges[i] = res.shift();
                    ranges = ranges.concat(res);
                }
                console.log(ranges);
            }
            console.log('map : ', test);
        }

        console.log(ranges);
        
        return [NaN, NaN];
    }
}

/**
 * 
 * @param {number[]} range 
 * @param {number[]} line 
 */
function overlappingRanges(range, line) {
    let before = [...range], overlap = [-1, 0];
    for (let i = 0; i < range[1]; i++) {
        // Overlap
        if (i + range[0] >= line[1] && i + range[0] < line[2] + line[1]) {
            if (overlap[0] == -1) {
                before[1] = i;
                overlap[0] = line[0] + (range[0] - line[1]);
                console.log(line[0] + (range[0] - line[1]));
            }
            overlap[1]++;
        }
    }
    // Values after the overlap
    let after = [overlap[0] + overlap[1], range[1] - overlap[1] - before[1]];

    return [before, overlap, after].filter(r => r && r[0] >= 0 && r[1] > 0);
}