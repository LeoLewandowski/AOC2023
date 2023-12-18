/**
 * 
 * @param {[number,number]} dir 
 * @param {'Clockwise'|'Counterclockwise'} str 
 * @returns {[number,number]}
 */
function rotate(dir, str) {
    let tmp;
    switch (str) {
        case 'Clockwise':
            tmp = dir[0];
            dir[0] = dir[1];
            dir[1] = -tmp;
            break;
        case 'Counterclockwise':
            tmp = dir[0];
            dir[0] = -dir[1];
            dir[1] = tmp;
            break;
    }
    return dir;
}

/**
 * Returns the box-drawing character relative to the one given
 * @param {string} c 
 * @returns {string}
 */
function getBoxChar(c) {
    switch(c) {
        case '|': return '│';
        case '-': return '─';
        case '/': return '╱';
        case '\\':return '╲';
        case '.': return ' ';
    }
    return c;
}

/**
 * Pauses during `ms` milliseconds
 * @param {number} ms 
 * @returns 
 */
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

/**
 * Checks if a 2d position is outside of a 2d grid
 * @param {[number,number]} pos 
 * @param {any[][]} table 
 * @returns {boolean}
 */
function outOfBounds(pos, table) {
    return (pos[0] < 0 || pos[0] >= table[0].length || pos[1] < 0 || pos[1] >= table.length);
}

/**
 * Deep copies a 2d grid
 * @param {T[][]} table 
 * @returns {T[][]}
 */
function copyTable(table){
    return table.map(x => { return [...x] });
}

/**
 * Returns a position formatted into a string
 * @param {[number, number]} pos 
 * @returns {string}
 */
function formatPosition(pos){
    return `${pos[0]},${pos[1]}`;
}

/**
 * Un-formats a position string into a position
 * @param {string} posString 
 * @returns {[number,number]}
 */
function unformatPosition(posString) {
    let tmp = posString.split(',');
    return [parseInt(tmp[0]), parseInt(tmp[1])];
}

function floodFill(table, ogPos, char, mode = 'replace') {
    var cells = [ogPos];
    while(cells.length > 0) {
        let nextCells = [];
        for(let pos of cells) {
            if(outOfBounds(pos,table) || table[pos[1]][pos[0]].includes(char)) continue;
            switch(mode) {
                case 'append': table[pos[1]][pos[0]] += char; break;
                case 'before': table[pos[1]][pos[0]] = char + table[pos[1]][pos[0]]; break;
                case 'replace':
                default: table[pos[1]][pos[0]] = char; break;
            }
            nextCells.push([pos[0] + 1, pos[1]]);
            nextCells.push([pos[0] - 1, pos[1]]);
            nextCells.push([pos[0], pos[1] + 1]);
            nextCells.push([pos[0], pos[1] - 1]);
        }
        cells = nextCells;
    }
    return table;
}

/**
 * Returns the area calculated by the shoelace algorithm from the given vertices
 * @param {[number,number][]} vertices 
 * @returns 
 */
function shoeLace(vertices){
    let sum = 0;
    for(let i = 1; i < vertices.length; i++) sum += (vertices[i - 1][0] * vertices[i][1]) - (vertices[i][0] * vertices[i - 1][1]);
    return Math.abs(sum) / 2;
}

module.exports = {
    rotate,
    getBoxChar,
    sleep,
    outOfBounds,
    copyTable,
    formatPosition,
    unformatPosition,
    floodFill,
    shoeLace
}