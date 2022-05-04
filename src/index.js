import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = (props) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: null,
    //     };
    // }
    const { value, squareClick } = props;
    return (
        <button
            className="square"
            // onClick={() => this.setState({value: 'X'})}
            onClick={squareClick}
        >
            {value}
        </button>
    );

    // render() {
    //     return (
    //     <button
    //         className="square"
    //         onClick={() => this.setState({value: 'X'})}
    //     >
    //         {this.state.value}
    //     </button>
    //     );
    // }
};

const Board = (props) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       squares: Array(9).fill(null),
    //     };
    //  }
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    const status = "Next player: " + (xIsNext ? "X" : "O");
    const winner = calculateWinner(squares);

    function handleClick(i) {
        // const sq = squares.slice()
        // sq[i] = 'X'
        // setSquares(sq)
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        setSquares((oldState) => {
            const sq = oldState.slice();
            sq[i] = xIsNext ? "X" : "O";
            return sq;
        });

        setXIsNext((oldState) => !oldState);
    }

    function renderSquare(i) {
        return (
            <Square
                value={squares[i]}
                squareClick={() => {
                    handleClick(i);
                }}
            />
        );
    }

    return (
        <div>
            <div className="status">{winner ? `${winner} won!` : status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
    // render() {
    //     const status = 'Next player: X';

    //     return (
    //     <div>
    //         <div className="status">{status}</div>
    //         <div className="board-row">
    //         {this.renderSquare(0)}
    //         {this.renderSquare(1)}
    //         {this.renderSquare(2)}
    //         </div>
    //         <div className="board-row">
    //         {this.renderSquare(3)}
    //         {this.renderSquare(4)}
    //         {this.renderSquare(5)}
    //         </div>
    //         <div className="board-row">
    //         {this.renderSquare(6)}
    //         {this.renderSquare(7)}
    //         {this.renderSquare(8)}
    //         </div>
    //     </div>
    //     );
    // }
};

const Game = (props) => {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
};

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
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
