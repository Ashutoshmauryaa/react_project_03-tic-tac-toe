import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import Square from "../components/Square";

type Player = "X" | "O" | null;
const Board: React.FC = () => {
  const activeplayer = Math.round(Math.random() + 1) === 1 ? "X" : "O";
  const [currentplayer, setCurrentplayer] = useState<"X" | "O">(activeplayer);
  const [squares, setsquares] = useState<Player[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);

  const onSetsquareValue = (index: number) => {
    const data = squares.map((value, i) => {
      if (index === i) {
        // checking with new index of array
        return currentplayer; // setting value of currentplayer at the same index
      }
      return value; // set null everyplace
    });
    setsquares(data);
    setCurrentplayer(currentplayer === "X" ? "O" : "X");
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setWinner(`${winner} is the winner, Reload for New game`);
    } else if (!winner && !squares.filter((square) => !square).length) {
      setWinner("Both players win, Reload for New game");
    }
  }, [squares]);
  const calculateWinner = (squares: Player[]) => {
    const possibleWinningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return possibleWinningCombinations
      .map((combo) => {
        const [a, b, c] = combo;
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] &&
          squares[a] === squares[c]
        ) {
          return squares[a];
        }
        return null;
      })
      .filter((data) => data)[0];
  };
  return (
    <div className="board-wrapper">
      {winner ? <p>{winner}</p> : <p>Hey {currentplayer},it's your turn</p>}
      <Grid columns={3} centered>
        {Array(9)
          .fill(null)
          .map((value, index) => (
            <Grid.Column className="board-column" key={index}>
              <Square
                onClick={() => onSetsquareValue(index)}
                value={squares[index]} // actual value persist
                winner={winner}
              />
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
};

export default Board;
