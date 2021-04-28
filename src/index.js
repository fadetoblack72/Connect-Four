import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return (
    <button className="square" onClick={props.onClick}
      style={{backgroundColor: props.value}}>
    </button>
  )
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        style={{backgroundColor: this.props.squares[i]}}
        onClick={() => this.props.onClick(i)}
    />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
        </div>
        <div className="board-row">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
        <div className="board-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
        </div>
        <div className="board-row">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
        </div>
        <div className="board-row">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(42).fill(null),
      }],
      stepNumber: 0,
      redIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    if(i < 35){
      while(squares[i+7] == null){
        i += 7;
        if(i >= 35){
          break;
        }
      }
    }
    squares[i] = this.state.redIsNext ? 'red' : 'yellow';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      redIsNext: !this.state.redIsNext,
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      redIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button 
            onClick={() => this.jumpTo(move)}
            >
              {desc}
              </button>
          </li>
        );
    });

    let gameState;
    if (winner) {
      gameState = 'Winner: ' + winner;
    } else if (history.length >= 42) {
      gameState = 'The game ended in a draw.'
    } else {
      gameState = 'Next player: ' + (this.state.redIsNext ? 'Red' : 'Yellow');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{gameState}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function chkLine(a,b,c,d) {
  // Check first cell non-zero and all cells match
  return ((a != null) && (a === b) && (a === c) && (a === d));
}

function calculateWinner(squares){
  const newSquares = [];
  let copy = squares.slice();
  while (copy.length) newSquares.push(copy.splice(0,7))
  for (let r = 0; r < 3; r++)
        for (let c = 0; c < 7; c++)
            if (chkLine(newSquares[r][c], newSquares[r+1][c], newSquares[r+2][c], newSquares[r+3][c]))
                return newSquares[r][c];

    // Check right
    for (let r = 0; r < 6; r++)
        for (let c = 0; c < 4; c++)
            if (chkLine(newSquares[r][c], newSquares[r][c+1], newSquares[r][c+2], newSquares[r][c+3]))
                return newSquares[r][c];

    // Check down-right
    for (let r = 0; r < 3; r++)
        for (let c = 0; c < 4; c++)
            if (chkLine(newSquares[r][c], newSquares[r+1][c+1], newSquares[r+2][c+2], newSquares[r+3][c+3]))
                return newSquares[r][c];

    // Check down-left
    for (let r = 3; r < 6; r++)
        for (let c = 0; c < 4; c++)
            if (chkLine(newSquares[r][c], newSquares[r-1][c+1], newSquares[r-2][c+2], newSquares[r-3][c+3]))
                return newSquares[r][c];

    return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);