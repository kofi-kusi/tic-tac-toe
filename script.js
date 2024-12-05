function GameBoard() {
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameboard[i].push(Cell());
        }
    }

    const getGameBoard = () => gameboard;

    const chooseCell = (row, column, player) => {
        if (row || column >= 3) return;
        gameboard[row][column].setValue(player);
    }

    const printBoard = () => {
        const boardWithCellValues = gameboard.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return { getGameBoard, printBoard, chooseCell }
}

function Cell(){
    let value = "-";

    const setValue = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { setValue, getValue }
}


function GameController(
    player1 = "player One",
    player2 = "player two"
) {
    const board = GameBoard();

    const players = [
        {
            name: player1,
            token: "x"
        },
        {
            name: player2,
            token: "o"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn...`);
    }

    const playRound = (row, column) => {
        board.chooseCell(row, column, getActivePlayer().token);

        switchPlayerTurn();
        playNewRound();
    }
    playNewRound();

    return { playRound, getActivePlayer };
}

const game = GameController();

