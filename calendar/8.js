const path = require("path");

module.exports = {
    desc: 'Day 8',
    execute(input) {
        const lines = input.split('\r\n').filter(x => x);
        const instructions = lines.shift();
        let paths = new Map();
        lines.forEach(l => paths.set(l.substring(0, 3), l.match(/(?<=\()[0-9A-Z]{3}, [0-9A-Z]{3}(?=\))/)[0].split(', ')));

        let steps = findNodePath('AAA', paths, instructions, (n) => n == 'ZZZ');

        let ghostSteps = [], nodes = Array.from(paths.entries()).filter(n => n[0].match(/[0-9A-Z]{2}A/)).map(n => n[0]);
        console.log(nodes);

        for(let i = 0; i < nodes.length; i++) ghostSteps.push(findNodePath(nodes[i], paths, instructions, (n) => n[2] == 'Z'));
        ghostSteps = ghostSteps.reduce((a,b) => lcm(a,b));

        return [steps, ghostSteps]
    }
}

function findNodePath(node, paths, instructions, checkfn) {
    let steps = 0;
    while (!checkfn(node)) {
        for (let i = 0; i < instructions.length && node != 'ZZZ'; i++) {
            node = paths.get(node)[instructions[i] == 'L' ? 0 : 1];
            steps++;
        }
    }
    return steps;
}

function lcm(a,b){
    for(let i = Math.min(a,b); i > 0; i--) if(!(a%i) && !(b%i)) return a*b/i;
}