module.exports = {
    desc: 'Cubes !',
    execute(string) {
        var totalIds = 0, totalPower = 0;
        string.split('\n').forEach(line => {
            let valid = true, rred = 0, rgreen = 0, rblue = 0;
            var id = parseInt(line.match(/(?<=Game )[0-9]+(?=:)/));
            if (isNaN(id)) return;
            line.split(';').forEach(draw => {
                let blue = 0, green = 0, red = 0;
                var bm = draw.match(/[0-9]+(?= blue)/g),
                    gm = draw.match(/[0-9]+(?= green)/g),
                    rm = draw.match(/[0-9]+(?= red)/g);
                
                if (bm && bm.length > 0) bm.forEach(b => blue += parseInt(b));
                if (gm && gm.length > 0) gm.forEach(g => green += parseInt(g));
                if (rm && rm.length > 0) rm.forEach(r => red += parseInt(r));
                
                if (blue > rblue) rblue = blue;
                if (green > rgreen) rgreen = green;
                if (red > rred) rred = red;
                valid &= (blue <= maxBlue && green <= maxGreen && red <= maxRed);
            })
            if(valid) totalIds += id;
            totalPower += (rred * rgreen * rblue);
        })
        return [totalIds,totalPower];
    }
}

const maxBlue = 14, maxGreen = 13, maxRed = 12;