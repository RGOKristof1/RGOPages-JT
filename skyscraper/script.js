function randomBetween(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
function generateHintMap(gridSize) {

}
function generateRandomMap(gridSize) {
    gridSize -= 2
    let grid = Array.from({length: gridSize}, () => Array(gridSize).fill(0));

    function isSafe(row, col, num) {
        // Check row
        for (let c = 0; c < gridSize; c++) {
            if (grid[row][c] === num) return false;
        }
        // Check column
        for (let r = 0; r < gridSize; r++) {
            if (grid[r][col] === num) return false;
        }
        return true;
    }

    function solveSudoku(pos = 0) {
        if (pos === gridSize * gridSize) return true;
        let row = Math.floor(pos / gridSize);
        let col = pos % gridSize;
        if (grid[row][col] !== 0) return solveSudoku(pos + 1);
        let nums = [1,2,3,4].sort(() => Math.random() - 0.5); // shuffle
        for (let num of nums) {
            if (isSafe(row, col, num)) {
                grid[row][col] = num;
                if (solveSudoku(pos + 1)) return true;
                grid[row][col] = 0;
            }
        }
        return false;
    }

    solveSudoku();

    solutionMap = grid.map(row => [...row]);
    console.log(solutionMap);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            document.getElementsByClassName(`${i+1}r ${j+1}c`)[0].innerHTML = solutionMap[i][j];
        }
    }

    generateHintMap(gridSize);
}

function generateGrid(gridSize) {
    gridSize += 2
    document.getElementById("playGround").innerHTML = ""
    document.getElementById("playGround").style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    for (let i = 0; i < gridSize; i++) {
        for (let i2 = 0; i2 < gridSize; i2++) {
            if (i == 0 && i2 != 0 && i2 != gridSize - 1) {
                document.getElementById("playGround").innerHTML += `<div class="${i}r ${i2}c arrowDown">${i}r ${i2}c</div>`
            } else if (i2 == 0 && i != 0 && i != gridSize - 1) {
                document.getElementById("playGround").innerHTML += `<div class="${i}r ${i2}c arrowRight">${i}r ${i2}c</div>`
            } else if (i2 == gridSize - 1 && i != 0 && i != gridSize - 1) {
                document.getElementById("playGround").innerHTML += `<div class="${i}r ${i2}c arrowLeft">${i}r ${i2}c</div>`
            } else if (i == gridSize - 1 && i2 != 0 && i2 != gridSize - 1) {
                document.getElementById("playGround").innerHTML += `<div class="${i}r ${i2}c arrowUp">${i}r ${i2}c</div>`
            } else if (i == 0 && i2 == 0 || i == 0 && i2 == gridSize - 1 || i == gridSize - 1 && i2 == 0 || i == gridSize - 1 && i2 == gridSize - 1) {
                document.getElementById("playGround").innerHTML += `<div class="${i}r ${i2}c corner"></div>`
            } else {
                document.getElementById("playGround").innerHTML += `<div class="${i}r ${i2}c">${i}r ${i2}c</div>`
            }
        } 
    }
    generateRandomMap(gridSize)
}