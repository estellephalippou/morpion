import { useState } from 'react';

function Square({ value, onSquareClick, isWinner }) {
  return (
    <button className={"square" + (isWinner ? ' square--winner' : '')} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winnerResult = calculateWinner(squares);
  const winner = winnerResult ? winnerResult.winner : null;
  const winningLine = winnerResult ? winnerResult.line : null;
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinner={winningLine && winningLine.includes(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinner={winningLine && winningLine.includes(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinner={winningLine && winningLine.includes(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinner={winningLine && winningLine.includes(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinner={winningLine && winningLine.includes(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinner={winningLine && winningLine.includes(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinner={winningLine && winningLine.includes(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinner={winningLine && winningLine.includes(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinner={winningLine && winningLine.includes(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }
 

  const winnerResult = calculateWinner(currentSquares);
  const winner = winnerResult ? winnerResult.winner : null;

  return (
    <div className="game" id='centered'>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div style={{ marginTop: 12 }}>
          <button onClick={handleReset}>Reset game</button>
        </div>
      </div>
      <div className="game-info">
        {winner && (
          <div className="winner-banner">{winner} wins!</div>
        )}
      </div>
    </div>
  );
}

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
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}
