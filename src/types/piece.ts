import { Color } from './game';
import { PieceSymbol } from './pieceSymbol';

export type Position = [number, number];
export type ColumnName = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
export type RowName = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Name = string;

export interface Piece {
  position: Position;
  name: string;
  symbol: PieceSymbol;
  color: Color;
}
