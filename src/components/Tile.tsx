import { Piece } from '../types';

interface Props {
  piece: Partial<Piece>;
  onClick(piece: Partial<Piece>): void;
}

export const Tile: React.FC<Props> = ({ piece, onClick }) => {
  return (
    <span
      onClick={() => {
        if (onClick) {
          onClick(piece);
        }
      }}>
      {piece.symbol ? piece.symbol : null}
    </span>
  );
};
