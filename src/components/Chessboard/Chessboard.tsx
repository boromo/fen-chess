import React, { useState } from 'react';
import { GameProviderProps } from '../context';
import { withGame } from '../hoc';
import { Tile } from '../Tile';
import './Chessboard.css';
import { ColumnName, Piece, PieceSymbol } from '../../types';
import { isLowerCase } from '../../utils';

const pieceSymbolMap: Record<string, PieceSymbol> = {
  p: '♟',
  P: '♙',
  r: '♜',
  R: '♖',
  n: '♞',
  N: '♘',
  b: '♝',
  B: '♗',
  q: '♛',
  Q: '♕',
  k: '♚',
  K: '♔',
};

const rowMap: Record<number, ColumnName> = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
  7: 'h',
};

export const Chessboard: React.FC<GameProviderProps> = ({ state, dispatch }) => {
  const [pieceInHand, setPieceInHand] = useState<Piece | undefined>();
  const { placement, activeColor } = state;

  const clickHandler = (piece: Piece) => {
    const { color, symbol, name } = piece;

    if ((!pieceInHand && color === activeColor) || (pieceInHand && color === activeColor)) {
      setPieceInHand(name === pieceInHand?.name ? undefined : piece);
    } else {
      if (pieceInHand && (!symbol || pieceInHand.color !== color)) {
        setPieceInHand(undefined);
        dispatch({ type: 'PIECE_MOVE', from: pieceInHand, to: piece });
      }
    }
  };

  return (
    <>
      <div className="Grid">
        {placement.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div className="Grid__item" key={`${rowIndex}-${colIndex}`}>
              <Tile
                piece={{
                  ...(col && { color: isLowerCase(col) ? 'b' : 'w' }),
                  name: `${rowMap[colIndex]}${8 - rowIndex}`,
                  symbol: pieceSymbolMap[col],
                  position: [colIndex, rowIndex],
                }}
                onClick={clickHandler}
              />
            </div>
          )),
        )}
      </div>
      <div>{activeColor === 'w' ? 'White' : 'Black'} is playing {pieceInHand && pieceInHand.name}</div>
    </>
  );
};

export const ChessboardWithGame = withGame(Chessboard);
