module.exports = {
    desc: 'Hash ?!',
    execute(input) {
        let totalPart1 = 0, totalPart2 = 0;
        input.split(',').forEach(s => {
            if (!s) return;
            totalPart1 += hash(s);
            // PART 2
            if (s.includes('=')) {
                let [key, value] = s.split('=');
                value = parseInt(value);
                let h = hash(key);
                if(!Boxes[h]) Boxes[h] = new Map();
                Boxes[h].set(key,value);
            } else {
                let key = s.replace('-','');
                let h = hash(key);
                if(Boxes[h]) Boxes[h].delete(key);
            }
        });
        for(let i = 0; i < Boxes.length; i++) {
            if(!Boxes[i]) continue;
            const focals = Array.from(Boxes[i].values());
            for(let j = 0; j < Boxes[i].size; j++) totalPart2 += (i+1) * (j+1) * focals[j];
        }
        return [totalPart1, totalPart2];
    }
}

/**@type {Map<string,number>[]} */
const Boxes = [];

function hash(s) {
    let strVal = 0;
    for (let i = 0; i < s.length; i++) strVal = ((strVal + s.charCodeAt(i)) * 17) % 256;
    return strVal;
}