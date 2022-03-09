import FENBoard from 'fen-chess-board';
import { GameState } from './types';

export function gameStateFromInputString(input: string) {
  const [placement, activeColor, castlingRights, nPassantTargets, halfMoves, fullMoves] =
    decodeURIComponent(input).split(' ');
  const fenBoard = new FENBoard(placement || 'start');

  return {
    fenBoard,
    placement: fenBoard.board,
    ...(activeColor && { activeColor }),
    ...(castlingRights && { castlingRights }),
    ...(nPassantTargets && { nPassantTargets }),
    ...(halfMoves && { halfMoves: Number(halfMoves) }),
    ...(fullMoves && { fullMoves: Number(fullMoves) }),
  } as GameState;
}

export function isLowerCase(str: string) {
  return str === str.toLowerCase() && str !== str.toUpperCase();
}
