module.exports = {
    desc: 'Seeds',
    execute(string) {
        const lists = string.split(/.*-to-.*/g).slice(1).map(l => l.split('\r\n').filter(x => x).map(c => c.split(' ').filter(x => x).map(c => parseInt(c))).sort((a, b) => b[1] - a[1]));
        var seeds = string.match(/(?<=seeds: ).+/)[0].split(' ').filter(x => x).map(y => parseInt(y));
        var ranges = string.match(/(?<=seeds: ).+/)[0].match(/[0-9]+ [0-9]+/g).map(r => r.split(' ').map(x => parseInt(x)));

        for (let list of lists) {
            var nextSeeds = [...seeds], nextRanges = [];
            var test = new Map();

            for (let j = 0; j < seeds.length; j++) {
                for (let line of list) {
                    let diff = seeds[j] - line[1];

                    if (diff >= 0 && diff < line[2]) {
                        nextSeeds[j] = diff + line[0];
                        break;
                    }
                }
            }

            for(let i = 0; i < ranges.length; i++) {
                var nextRange = [ranges[i]];
                for (let line of list) {
                    var res = overlappingRanges(ranges[i], line);
                    res.forEach(r => {
                        if(!(test.get(r[0]) >= r[1])){
                            if(r[1] == ranges[i]) test.delete(ranges[i][0]);
                            test.set(r[0], r[1]);
                        }
                    })
                    if(res.length == 1 && res[0][0] == ranges[i][0]) continue;
                    nextRange = res;
                    break;
                }
                nextRanges = nextRanges.concat(nextRange);
            }
            seeds = nextSeeds;
            ranges = nextRanges;
            console.log(test, ranges);
        }

        var result2 = ranges.reduce((a, c) => Math.min(a, c[0]), Infinity);

        return [Math.min(...seeds), result2/*Math.min(...seedRanges.map(x => Math.min(...x)))*/];
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
                overlap[0] = line[0] + Math.max(range[0] - line[1], 0);
            }
            overlap[1]++;
        }
    }
    // Values after the overlap
    let after = [overlap[0] + overlap[1], range[1] - overlap[1] - before[1]];

    return [before, overlap, after].filter(r => r && r[0] >= 0 && r[1] > 0);
}