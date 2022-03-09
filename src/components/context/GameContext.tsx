import { Dispatch, createContext, FC } from 'react';
import { GameAction, GameState } from '../../types';

export const GameContext = createContext<{ state: GameState, dispatch: Dispatch<GameAction>} | undefined>(undefined);

export interface GameProviderProps {
  state: GameState;
  dispatch: Dispatch<GameAction>
}

export const GameProvider: FC<GameProviderProps> = ({ children, state, dispatch }) => {
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}
