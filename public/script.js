import Space from "./space.js"

// Example player board representation
// Isaac: I marked the indices with x and y to make it clearer
// X's go from left to right
// Y's go from top to bottom 
// Coordinate not exactly what you think it is. To go South of board from top right you need to do +x and to go north -x and same for y +y to go right and -y to go left. 
const newBoard = () =>
{
    let board = []
    for(let y=0; y<9; y++){
        let row = []
        for(let x=0; x<9; x++){
            let space = new Space(y, x);
            row.push(space)
        }
        board.push(row)
    }

    return board
}

const player1Board = newBoard();
const player2Board = newBoard();

//Given an x,y where 0 <= x,y < 9, and a state (back)board of Spaces, find the cooresponding Space for that coordinate on the board
const findSpace = (x, y, board) => {
    for(let row of board){
        for(let cell of row){
            if(cell.coordinate.x == x && cell.coordinate.y == y){
                return cell
            }
        }
    }
}

// Takes a Player's board representation and maps the values
// onto the HTML Table
const mapToGrid = (board, boardId) => {
    let gameGrid = document.querySelector(boardId);

    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            console.log(board[i][j].state)
            gameGrid.children[0].children[i].children[j].innerHTML = board[i][j].state;
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
const execOnGrid = (boardId, fn) => {
    console.log(`Executing ${fn.name}`)
    let gameGrid = document.querySelector(boardId);
    for (let row of gameGrid.children[0].children) {
        for (let cell of row.children) {
            fn(cell);
        }
    }
}

// Starts the game
const startGame = () => {
    console.log("Starting Game");
    mapToGrid(player1Board, "#game-grid-1");
    player1Board[0][1].state = "Ship";
    console.log(findSpace(2, 5, player1Board).coordinate);
    mapToGrid(player2Board, "#game-grid-2");
    //--Placing Phase-------
}

/*
* Method: gameOver
* Pre: None
* Params: winnerName: "The winners board"
* Post: Game is reset and winner is announced
*/
const gameOver = (winnerName) => {
    clearBoard("#game-grid-1");
    clearBoard("#game-grid-2");
    console.log(`Game Won by: ${winnerName}`);
    alert(`Game Won by: ${winnerName}`)
}

/*
* Method: clearBoard
* Pre: None
* Params: boardName: "Name of the board being cleared"
* Post: The game board cell values, styles, and onclicks are removed
*/
const clearBoard = (boardName) => {
    execOnGrid(boardName, (cell) => {
        cell.innerHTML = "";
        cell.style = "";
        cell.onclick = "";
    })
}



document.addEventListener("DOMContentLoaded", function () {

    /*Fire Command
    
    - Waiting for what the states of each board is (Whoever is working on it)
    Adding even listeners to every table and cell when attacking 
    Need name of gameboard2 to contiue then change turns 
    
    const fireturn =(playerboard) => 
    {}
    */

    let gameboard1 = document.getElementById("game-grid-1");
    for (let i = 0; i < gameboard1.rows.length; i++) {
        for (let j = 0; j < gameboard1.rows[i].cells.length; j++) {
            gameboard1.rows[i].cells[j].addEventListener("click", (cell) => {
                console.log("clicked on this cell");
                if (gameboard1.rows[i].cells[j].innerHTML == "1") //Will be S if its a ship using 1 to test 
                {
                    gameboard1.rows[i].cells[j].innerHTML = "HIT"; //WIll be changed to H if its a hit
                }
                else {
                    gameboard1.rows[i].cells[j].innerHTML = "MISS"; //WIll be changed to H if its a hit
                }
            });

        }

    }

    let gameboard2 = document.getElementById("game-grid-2");
    for (let i = 0; i < gameboard2.rows.length; i++) {
        for (let j = 0; j < gameboard2.rows[i].cells.length; j++) {
            gameboard2.rows[i].cells[j].addEventListener("click", (cell) => {
                console.log("clicked on this cell");
                if (gameboard2.rows[i].cells[j].innerHTML == "1") //Will be S if its a ship using 1 to test 
                {
                    gameboard2.rows[i].cells[j].innerHTML = "HIT"; //WIll be changed to H if its a hit
                }
                else {
                    gameboard2.rows[i].cells[j].innerHTML = "MISS"; //WIll be changed to H if its a hit
                }
            });

        }

    }

    document.getElementById("start").addEventListener("click", startGame)

})

checkBounds = (ship) => {
    for(let i = 0; i < ship.length; i++)
    {
      let x = ship.List[i].coordinate.x;
      let y = ship.List[i].coordinate.y;

      if((x < 0 && x > 8) || (y < 0 && y > 8)) 
      {
        return false;
      }
    }

  }
  //-------------------------