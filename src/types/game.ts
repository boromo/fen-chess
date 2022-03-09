import { Piece } from './piece';
import FENBoard from 'fen-chess-board';
export type Color = 'b' | 'w';

export interface GameState {
  placement: Array<Array<string>>;
  activeColor: Color;
  castlingRights: string;
  nPassantTargets: string | '-';
  halfMoves: number;
  fullMoves: number;
  fenBoard: FENBoard;
}

export type PieceMove = {
  type: 'PIECE_MOVE';
  from: Piece;
  to: Piece;
};

export type GameAction = PieceMove;
