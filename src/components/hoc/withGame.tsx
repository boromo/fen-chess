import React from 'react';
import { GameContext, GameProviderProps } from '../context';

export const withGame = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<Omit<P, keyof GameProviderProps>> => {
  return (props) => {
    return (
      <GameContext.Consumer>
        {(value) => <Component {...props as P} state={value?.state} dispatch={value?.dispatch} />}
      </GameContext.Consumer>
    );
  };
};