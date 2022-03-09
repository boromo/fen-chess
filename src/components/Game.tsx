import { useReducer } from 'react';
import { ChessboardWithGame as Chessboard } from './Chessboard';
import { GameState, GameAction } from '../types';
import { GameProvider } from './context';

interface Props {
  gameState: GameState;
}

const initialState = {
  placement: [],
  activeColor: 'w',
  castlingRights: 'KQkq',
  nPassantTargets: '-',
  halfMoves: 0,
  fullMoves: 0,
};

function reducer(state: GameState, action: GameAction): GameState {
  const { fenBoard, halfMoves, fullMoves, activeColor } = state;

  switch (action.type) {
    case 'PIECE_MOVE':
      const { from, to } = action;

      if (from.color !== to.color) {
        fenBoard.clear(to.name);
      }
      fenBoard.move(from.name, to.name);

      return {
        ...state,
        activeColor: activeColor === 'b' ? 'w' : 'b',
        placement: fenBoard.board,
        halfMoves: halfMoves + 1,
        ...(activeColor === 'b' && halfMoves > 0 && { fullMoves: fullMoves + 1 }),
      };
    default:
      return state;
  }
}

export const Game: React.FC<Props> = ({ gameState }) => {
  const { history } = window;
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...gameState });
  const {
    fenBoard: { fen },
    activeColor,
    castlingRights,
    nPassantTargets,
    halfMoves,
    fullMoves,
  } = state;
  history.replaceState(
    {},
    '',
    encodeURIComponent(`${fen} ${activeColor} ${castlingRights} ${nPassantTargets} ${halfMoves} ${fullMoves}`),
  );

  return (
    <GameProvider state={state} dispatch={dispatch}>
      <Chessboard />
    </GameProvider>
  );
};
