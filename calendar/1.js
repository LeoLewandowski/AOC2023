module.exports = {
    desc:'Trebuchet',
    execute(string){
        var total = 0, totalWithLetters = 0;
        string.split('\n').filter(x => x).forEach(s => {
            let line = s.match(/[1-9]/g);
            total += parseInt(line[0] + line[line.length - 1]);
            let m = Array.from(s.matchAll(/(?<=([1-9]|one|two|three|four|five|six|seven|eight|nine))/gi), match => match[1]).filter(x => x);
            if(m && m.length > 0){
                if(m[0].length > 1) m[0] = numbers[m[0]];
                if(m[m.length - 1].length > 1) m[m.length - 1] = numbers[m[m.length - 1]];
                totalWithLetters += parseInt(m[0] + m[m.length - 1]);
            }
        });
        return [total,totalWithLetters];
    }
}

numbers = {
    'one':'1',
    'two':'2',
    'three':'3',
    'four':'4',
    'five':'5',
    'six':'6',
    'seven':'7',
    'eight':'8',
    'nine':'9'
}