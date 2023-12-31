const fs = require('fs');
const readline = require('readline');

console.clear();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const days = new Map();

function printCalendar() {
    console.clear();
    console.log('List of days :\n');
    for(let el of days.entries()){
        console.log(`\x1b[33m${el[0].padStart(3, ' ')}\x1b[0m | ${el[1].desc}`);
    }
    return launchDay();
}

async function askInput(day) {
    rl.question('Give a .txt file path for this module (or anything else for fallback to default file) :\n --> ',async a => {
        if (!fs.existsSync(a)) {
            console.log('Not a valid path ! Fallback to default file\n');
            a = `./txt/${day}.txt`;
        }
        fs.readFile(a, async (e, data) => {
            let t = Date.now();
            const result = await days.get(day).execute(data.toString())
            let t2 = Date.now();
            console.log(`Part 1 : \x1b[32m${result[0]}\x1b[0m\nPart 2 : \x1b[32m${result[1]}\x1b[0m\nTime taken : ${t2 - t}ms\n\nType 'Enter' to continue...`);
        });
        return rl.question('', () => {
            console.clear();
            launchDay();
        });
    })
}

function launchDay() {
    rl.question('\nType a day\'s number to launch its program, or `calendar` to get a list of the days\nType `e` or `exit` to close this program\n --> ', input => {
        if (input == 'e' || input == 'exit') return process.exit();
        else if (input == 'calendar' || input == 'c') printCalendar();
        else if (days.get(input)) askInput(input);
        else {
            console.log('Answer not acceptable\n')
            return launchDay();
        }
    })
}

console.log('List of days :\n')

fs.readdir('./calendar', (e, files) => {
    files.forEach(f => {
        let a = f.split('.')[0];
        let m = require(`./calendar/${a}`);
        console.log(`\x1b[33m${a.padStart(3, ' ')}\x1b[0m | ${m.desc}`);
        days.set(a, m);
    });
    launchDay();
});
