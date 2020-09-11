import Space from "./space.js"

// Example player board representation
// Isaac: I marked the indices with x and y to make it clearer
// X's go from left to right
// Y's go from top to bottom 
// Coordinate not exactly what you think it is. To go South of board from top right you need to do +x and to go north -x and same for y +y to go right and -y to go left. 
const newBoard = () => {
    let board = []
    for (let y = 0; y < 9; y++) {
        let row = []
        for (let x = 0; x < 9; x++) {
            let space = new Space(y, x);
            row.push(space)
        }
        board.push(row)
    }

    return board
}


//Given an x,y where 0 <= x,y < 9, and a state (back)board of Spaces, find the cooresponding Space for that coordinate on the board
const findSpace = (x, y, board) => {
    for (let row of board) {
        for (let cell of row) {
            if (cell.coordinate.x == x && cell.coordinate.y == y) {
                return cell
            }
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

const player1Board = newBoard();
const player2Board = newBoard();
const player1OppBoard = [...player1Board];
const player2Oppboard = [...player2Board];

let numberOfShips = 0;

const showPlayerBoard = (board, gridId, opponentBoard, opponentId) => {
    confirm("Switch Players");
    displayboard(board, gridId);
    displayboard(opponentBoard, opponentId);
}

const selectNumberShips = () => {
    do {
        numberOfShips = parseInt(window.prompt("Enter the Number of Ships (1-5): "));
    } while (numberOfShips < 0 || numberOfShips > 5 || isNaN(numberOfShips));
}

const placeShips = (player, playerBoard) => {
    for (let i = 1; i <= numberOfShips; i++) {
        let validShip = false;
        let coordinates;
        let direction;
        while (!validShip) {
            coordinates = "";
            while (
                coordinates.length !== 2 ||
                !["A", "B", "C", "D", "E", "F", "G", "H", "I"].includes(coordinates[0]) ||
                !['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(coordinates[1])
            ) {
                coordinates = prompt(`Coordinates of ${player}'s ${i}x1 ship head: (A-I + 1-9)`);
            }
            direction = "";
            while (!["up", "down", "left", "right"].includes(direction)) {
                direction = prompt(`Direction the rest of the ship is facing: (up, down, left, right)`);
            }
            let valid;
            for (let j = 0; j < i; j++) {
                console.log("for", j, valid);
                valid = true;
                try {
                    if (playerBoard[
                        ["A", "B", "C", "D", "E", "F", "G", "H", "I"].indexOf(coordinates[0]) - (j * (direction === "up" ? 1 : direction === "down" ? -1 : 0))
                    ][
                        parseInt(coordinates[1]) - 1 - (j * (direction === "left" ? 1 : direction === "right" ? -1 : 0))
                    ].state === "Ship") {
                        console.log("inside");
                        valid = false;
                        break;
                    }
                } catch {
                    console.log("catch");
                    valid = false;
                    break;
                }
            }
            if (valid === false) {
                console.log("invalid");
                validShip = false;
                continue;
            } else {
                validShip = true;
            }
        }
        for (let j = 0; j < i; j++) {
            playerBoard[
                ["A", "B", "C", "D", "E", "F", "G", "H", "I"].indexOf(coordinates[0]) - (j * (direction === "up" ? 1 : direction === "down" ? -1 : 0))
            ][
                coordinates[1] - 1 - (j * (direction === "left" ? 1 : direction === "right" ? -1 : 0))
            ].state = "Ship";
            displayboard(playerBoard, player === "Player 1" ? "#game-grid-1" : "#game-grid-2");
        }
    }
    displayboard(playerBoard, player === "Player 1" ? "#game-grid-1" : "#game-grid-2");
}

const isGameWon = () => {
    if (player1Board.every((row) => { row.every((cell) => cell.state !== "Ship") })) {
        gameOver("Player 1");
        return true;
    } else if (player2Board.every((row) => { row.every((cell) => cell.state !== "Ship") })) {
        gameOver("Player 2");
        return true;
    }
    return false;
}

const player1Turn = () => {
    showPlayerBoard(player1Board, "#game-grid-1", player1OppBoard, "#game-grid-2");
    let hitting = true;
    while (hitting) {
        let coordinates = "";
        let converted = {};
        while (
            coordinates.length !== 2 ||
            !["A", "B", "C", "D", "E", "F", "G", "H", "I"].includes(coordinates[0]) ||
            !['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(coordinates[1])
        ) {
            coordinates = prompt(`Coordinates to fire at: (A-I + 1-9)`);
        }
        converted.x = ["A", "B", "C", "D", "E", "F", "G", "H", "I"].indexOf(coordinates[0]);
        converted.y = parseInt(coordinates[1]) - 1
        if (player2Board[converted.x][converted.y].state === "Ship") {
            alert("HIT!!!!!");
            player1OppBoard[converted.x][converted.y] = "Hit";
        } else {
            hitting = false;
            alert("MISS");
            player1OppBoard[converted.x][converted.y] = "Miss";
        }
        displayboard(player1OppBoard, "#game-grid-2");
    }
}

const player2Turn = () => {
    showPlayerBoard(player2Board, "#game-grid-2", player2OppBoard, "#game-grid-1");
    let hitting = true;
    while (hitting) {
        let coordinates = "";
        let converted = { x, y };
        while (
            coordinates.length !== 2 ||
            !["A", "B", "C", "D", "E", "F", "G", "H", "I"].includes(coordinates[0]) ||
            !['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(coordinates[1])
        ) {
            coordinates = prompt(`Coordinates to fire at: (A-I + 1-9)`);
        }
        converted.x = ["A", "B", "C", "D", "E", "F", "G", "H", "I"].indexOf(coordinates[0]);
        converted.y = parseInt(coordinates[1]) - 1
        if (player1Board[converted.x][converted.y].state === "Ship") {
            alert("HIT!!!!!");
            player2OppBoard[converted.x][converted.y] = "Hit";
        } else {
            hitting = false;
            alert("MISS");
            player2OppBoard[converted.x][converted.y] = "Miss";
        }
        displayboard(player2OppBoard, "#game-grid-2");
    }
}

// Starts the game
const startGame = () => {
    selectNumberShips();
    console.log("Playing with", numberOfShips, "ships");
    placeShips("Player 1", player1Board);
    alert("Player 1 Ships Placed! Switch Positions");
    placeShips("Player 2", player2Board);
    console.log("Starting Game");
    while (!isGameWon()) {
        player1Turn();
        if (isGameWon()) {
            break;
        }
        player2Turn();
    }
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
    
    Fire Function purely changing the backboard state. 
    
    const fireturn =(stateboard,turn) => 
    {}
    */
    // let gameboard1 = document.getElementById("game-grid-1");
    // for (let i = 0; i < gameboard1.rows.length; i++) {
    //     for (let j = 0; j < gameboard1.rows[i].cells.length; j++) {
    //         gameboard1.rows[j].cells[i].addEventListener("click", () => {
    //             handleClick(i, j);
    //             displayboard(player1Board, "#game-grid-1");
    //         });

    //     }

    // }

    // let gameboard2 = document.getElementById("game-grid-2");
    // for (let i = 0; i < gameboard2.rows.length; i++) {
    //     for (let j = 0; j < gameboard2.rows[i].cells.length; j++) {
    //         gameboard2.rows[j].cells[i].addEventListener("click", (cell) => {
    //             console.log(j, i);
    //             if (player2Board[j][i].state == "Ship") //Will be S if its a ship using 1 to test 
    //             {
    //                 player2Board[j][i].state = "Hit";
    //                 gameboard2.rows[j].cells[i].style.backgroundColor = "red"; //This will be else where
    //             }
    //             else {
    //                 player2Board[j][i].state = "Miss";
    //             }
    //         });

    //     }

    // }

    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("game-over").addEventListener("click", () => gameOver("Person"));
})

//Function display the state 
//Might messed up the index cause j and i are flipped haha thanks Issac!
const displayboard = (statebackboard, ID) => {
    let gameboard1 = document.querySelector(ID);

    for (let i = 0; i < gameboard1.rows.length; i++) {
        for (let j = 0; j < gameboard1.rows[i].cells.length; j++) {
            if (statebackboard[j][i].state == "Ship") {
                gameboard1.rows[j].cells[i].innerHTML = "Ship";
            }
            if (statebackboard[j][i].state == "Empty") {
                gameboard1.rows[j].cells[i].innerHTML = "~";
            }
            if (statebackboard[j][i].state == "Miss") {
                gameboard1.rows[j].cells[i].innerHTML = "X";
            }
            if (statebackboard[j][i].state == "Hit") {
                gameboard1.rows[j].cells[i].style.backgroundColor = "red";
            }
        }
    }
}

const checkBounds = (ship) => {
    for (let i = 0; i < ship.length; i++) {
        let x = ship.List[i].coordinate.x;
        let y = ship.List[i].coordinate.y;

        if ((x < 0 && x > 8) || (y < 0 && y > 8)) {
            return false;
        }
    }

}