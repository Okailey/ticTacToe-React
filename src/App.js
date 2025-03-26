//imports
import { useState } from "react";

// Square component renders a single square in the grid and
// takes three inputs: the value to be displayed inside the square and
// onSquareClick which is a function that is called when the square is clicked
// we can update the game state by doing this
// isWinningSquare which is going to help us determine the squares that the user used to win

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      className={`square ${isWinningSquare ? "winning" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

//Board takes in 3 inputs: xIsNext, squares and onPlay
// xIsNext tells whether to make the move X or O, squares an array showing
//the current state of the board
// and the onPlay updates the board when the user interacts with it

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "0";
    }

    onPlay(nextSquares);
  }

  // calculates who the winner highlights the sequence that the player used to win
  const { theWinner, line } = calculateWinner(squares) || {
    theWinner: null,
    line: null,
  };
  let status;

  if (theWinner) {
    status = "Winner is " + theWinner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          isWinningSquare={line && line.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          isWinningSquare={line && line.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          isWinningSquare={line && line.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          isWinningSquare={line && line.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          isWinningSquare={line && line.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          isWinningSquare={line && line.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          isWinningSquare={line && line.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          isWinningSquare={line && line.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          isWinningSquare={line && line.includes(8)}
        />
      </div>
    </>
  );
}
//
export default function Game() {
  // Initializing state for the game's history, where the array will be null
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // initialized state of curr move, set move = 0 to begin with
  const [currentMove, setCurrentMove] = useState(0);

  //Getting the current board state for the curr move
  const currentSquares = history[currentMove];

  // Determining if it's player "X"'s turn
  const xIsNext = currentMove % 2 === 0;

  //  Function is called when a player clicks a square
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Function to go to a specific move in our history
  function jumpTo(nextMove) {
    // TODO
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0); out
  }

  // Creates a list of moves to jump to each move
  const moves = history.map((squares, move) => {
    let description;
    //descriptions for start move or a move while game has started
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//find the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { theWinner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}
