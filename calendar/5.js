module.exports = {
    desc: 'Seeds',
    execute(string) {
        const lists = string.split(/.*-to-.*/g).slice(1).map(l => l.split('\r\n').filter(x => x).map(c => c.split(' ').filter(x => x).map(c => parseInt(c))).sort((a,b) => b[1] - a[1]));
        var seeds = string.match(/(?<=seeds: ).+/)[0].split(' ').filter(x => x).map(y => parseInt(y));
        var seedRanges = string.match(/(?<=seeds: ).+/)[0].match(/[0-9]+ [0-9]+/g).map(r => r.split(' ').map(x => parseInt(x)));

        // string.match(/(?<=seeds: ).+/)[0].match(/[0-9]+ [0-9]+/g).forEach(r => {
        //     var range = r.split(' ').map(x => parseInt(x));
        //     let x = [];
        //     for(let i = 0; i < range[1]; i++) x.push(i + range[0]);
        //     seedRanges.push(x);
        // });

        console.log(seedRanges);

        for(let list of lists) {
            var nextSeeds = [...seeds], nextRanges = [...seedRanges];

            for(let j = 0; j < seeds.length; j++){
                for(let line of list) {
                    let diff = seeds[j] - line[1];

                    if(diff >= 0 && diff < line[2]){
                        nextSeeds[j] = diff + line[0];
                        break;
                    }
                }
            }

            // for(let k = 0; k < seedRanges.length; k++){
            //     for(let l = 0; l < seedRanges[k].length; l++){
            //         for(let line of list) {
            //             let diff = seedRanges[k][l] - line[1];

            //             if(diff >= 0 && diff < line[2]){
            //                 nextRanges[k][l] = diff + line[0];
            //                 break;
            //             }
            //         }
            //     }
            // }
            console.log('--------------------------------------------------------------------');
            for(let k = 0; k < seedRanges.length; k++){
                let range = seedRanges[k];
                console.log(range, k)
                for(let l = 0; l < range[1]; l++){
                    console.log(l, '.................');
                    for(let line of list){
                        let diff = range[0] + l - line[1];
                        console.log(diff);
                    }
                }
            }

            seeds = nextSeeds;
            seedRanges = nextRanges;
        }

        return [Math.min(...seeds), NaN/*Math.min(...seedRanges.map(x => Math.min(...x)))*/];
    }
}