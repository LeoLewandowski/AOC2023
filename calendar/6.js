const { time, count } = require("console");

module.exports = {
    desc:'Boat',
    execute(string){
        const times = string.split('\r\n')[0].replace('Time:','').split(/ +/g).filter(a => a).map(x => parseInt(x));
        const distances = string.split('\n')[1].replace('Distance:','').split(/ +/g).filter(a => a).map(x => parseInt(x));
        const time = parseInt(times.reduce((a,v) => a += v.toString(), ''));
        const distance = parseInt(distances.reduce((a,v) => a += v.toString(), ''));

        var total = 1;
        for(let i = 0; i < times.length; i++){
            var counter = 0;
            for(let j = 0; j <= times[i]; j++) if((times[i] - j) * j > distances[i]) counter++
            if(counter) total *= counter;
        }

        var bigCounter = 0;
        for(let j = 0; j <= time; j++) if((time - j) * j > distance) bigCounter++

        return [total, bigCounter];
    }
}