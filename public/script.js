import Space from "./space.js"

// Example player board representation
// Isaac: I marked the indices with x and y to make it clearer
// X's go from left to right
// Y's go from top to bottom 
const player1Board = () => {
    let board = []
    for(let y=1; y<10; y++){
        let row = []
        for(let x=1; x<10; x++){
            let space = new Space(x, y);
            row.push(space)
        }
        board.push(row)
    }

    return board
}

// Takes a Player's board representation and maps the values
// onto the HTML Table
const mapToGrid = (board) => {
    let gameGrid1 = document.querySelector("#game-grid-1");
    let gameGrid2 = document.querySelector("#game-grid-2");
    for (let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            console.log(board[i][j].coordinate)
            gameGrid1.children[0].children[i].children[j].innerText = board[i][j].state;
            gameGrid2.children[0].children[i].children[j].innerText = board[i][j].state;
        }
    }
}

const toggleColor = (cell, color) => {
    let cellElem = document.querySelector('#' + cell.id);
    cellElem.onclick = () => {
        if (cellElem.style.backgroundColor !== color) {
            cellElem.style = `background-color: ${color};`;
        } else {
            cellElem.style = "";
        }
    }
}

// Allows for the execution of a callback function
// on every single grid within the Game Table
const execOnGrid = (fn) => {
    console.log(`Executing ${fn.name}`)
    let gameGrid = document.querySelector("#game-grid-1");
    for (let row of gameGrid.children[0].children) {
        for (let cell of row.children) {
            fn(cell);
        }
    }
}

// Starts the game
const startGame = () => {
    console.log("Starting Game");
    let board = player1Board();
    mapToGrid(board);
}

document.querySelector("#start").addEventListener("click", startGame);