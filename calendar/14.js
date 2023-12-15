const { exec } = require("child_process");

module.exports = {
    desc: 'Rocks !',
    execute(input) {
        const Cache = new Map();
        let LoopSize = 0, LoopPlatform;
        platformSpin = input.split('\r\n');
        let platform = [...platformSpin];
        rollRocksNorth(platform);

        let i = 0;
        for (i; i < IT_NB; i++) {
            let str = platformSpin.join('');
            if (Cache.get(str)) {
                if (str == LoopPlatform) break;
                if (!LoopSize) LoopPlatform = str;
                LoopSize++;
            }
            rollRocksNorth();
            rollRocksWest();
            rollRocksSouth();
            rollRocksEast();
            Cache.set(str, true);
        }
        for (let j = 0; j < (IT_NB - i) % LoopSize; j++) {
            rollRocksNorth();
            rollRocksWest();
            rollRocksSouth();
            rollRocksEast();
         }
        return [countLoad(platform), countLoad(platformSpin)];
    }
}

var platformSpin

const IT_NB = 1_000_000_000;

function rollRocksNorth(p = platformSpin) {
    for (let y = 0; y < p.length; y++) {
        for (let x = 0; x < p[0].length; x++) {
            if (p[y][x] != 'O') continue;
            for (let i = 0; i < y; i++) {
                if ('#O'.includes(p[y - i - 1][x])) break;
                p[y - i] = p[y - i].slice(0, x) + '.' + p[y - i].slice(x + 1);
                p[y - i - 1] = p[y - i - 1].slice(0, x) + 'O' + p[y - i - 1].slice(x + 1);
            }
        }
    }
    return p;
}

function rollRocksWest() {
    for (let y = 0; y < platformSpin.length; y++) {
        for (let x = 0; x < platformSpin[0].length; x++) {
            if (platformSpin[y][x] != 'O') continue;
            for (let i = 0; i < x; i++) {
                if ('#O'.includes(platformSpin[y][x - i - 1])) break;
                platformSpin[y] = platformSpin[y].slice(0, x - i - 1) + 'O.' + platformSpin[y].slice(x - i + 1);
            }
        }
    }
    return platformSpin;
}

function rollRocksEast() {
    for (let y = 0; y < platformSpin.length; y++) {
        for (let x = platformSpin[0].length; x > 0; x--) {
            if (platformSpin[y][x - 1] != 'O') continue;
            for (let i = 0; i < platformSpin[0].length - x; i++) {
                if ('#O'.includes(platformSpin[y][x + i])) break;
                platformSpin[y] = platformSpin[y].slice(0, x + i - 1) + '.O' + platformSpin[y].slice(x + i + 1);
            }
        }
    }
    return platformSpin;
}

function rollRocksSouth() {
    for (let y = platformSpin.length; y > 0; y--) {
        for (let x = 0; x < platformSpin[0].length; x++) {
            if (platformSpin[y - 1][x] != 'O') continue;
            for (let i = 0; i < platformSpin[0].length - y; i++) {
                if ('#O'.includes(platformSpin[y + i][x])) break;
                platformSpin[y + i - 1] = platformSpin[y + i - 1].slice(0, x) + '.' + platformSpin[y + i - 1].slice(x + 1);
                platformSpin[y + i] = platformSpin[y + i].slice(0, x) + 'O' + platformSpin[y + i].slice(x + 1);
            }
        }
    }
    return platformSpin;
}

function countLoad(platform) {
    let counter = 0;
    for (let y = 0; y < platform.length; y++) {
        let m = platform[y].match(/O/g);
        if (m && m.length > 0) counter += m.length * (platform.length - y);
    }
    return counter;
}

function getDir(i) {
    return (i > 1 ? (i == 2 ? 'South' : 'East') : (i == 0 ? 'North' : 'West'));
}