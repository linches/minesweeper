document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = makeBoard(4);

function makeBoard(grid) {
    var board = {
        cells: []
    };
    for (var x = 0; x < grid; x++) {
        for (var y = 0; y < grid; y++) {
            board.cells.push({ row: x, col: y, isMine: Math.random() < 0.3, hidden: true, isMarked: false })
        }
    }
    return board;
}

function startGame() {
    for (var j = 0; j < board.cells.length; j++) {
        board.cells[j].surroundingMines = countSurroundingMines(board.cells[j])
    }
    document.addEventListener("click", checkForWin);
    document.addEventListener("auxclick", checkForWin);
    // Don't remove this function call: it makes the game work!
    lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

    for (var i = 0; i < board.cells.length; i++) {
        if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
            return
        }
        if (board.cells[i].isMine === true && board.cells[i].isMarked === false) {
            return
        }
    }
    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
    var surrounding = lib.getSurroundingCells(cell.row, cell.col);
    var count = 0;
    for (var k = 0; k < surrounding.length; k++) {
        if (surrounding[k].isMine === true) {
            count++
        }
    }
    return count;
}

function gameReset() {
    document.getElementById('reset', location.reload())
}