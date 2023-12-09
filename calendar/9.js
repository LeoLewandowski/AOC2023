module.exports = {
    desc:'OASIS',
    execute(input){
        let total = 0 ,secondTotal = 0;
        input.split('\r\n').filter(x => x).map(l => l.split(' ').map(n => parseInt(n))).forEach(line => {
            let sequences = [line];
            while(sequences[sequences.length - 1].find(a => a != 0)) sequences.push(nextSequence(sequences[sequences.length - 1]));

            let newTerm = 0, previousTerm = 0;
            for(let i = sequences.length - 2; i >= 0; i--){
                newTerm += sequences[i][sequences[i].length - 1];
                previousTerm = sequences[i][0] - previousTerm;
            }
            total += newTerm;
            secondTotal += previousTerm;
        });
        return [total, secondTotal];
    }
}

function nextSequence(sequence){
    let newSeq = [];
    for(let i = 1; i < sequence.length; i++){
        newSeq.push(sequence[i] - sequence[i-1]);
    }
    return newSeq;
}