import React from "react";

interface ISquareProps {
  onClick: () => void;
  value: "X" | "O" | null;
  winner: string | null;
}
const Square: React.FC<ISquareProps> = ({ onClick, value, winner }) => {
  if (!value) {
    return (
      <button
        className="button-wrapper"
        onClick={onClick}
        style={{ cursor: "pointer" }}
        disabled={Boolean(winner)}
      >
        {value}
      </button>
    );
  } else {
    return (
      <button className={`button-wrapper square_${value}`} disabled>
        {value}
      </button>
    );
  }
};

export default Square;
