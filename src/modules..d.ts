declare module 'fen-chess-board' {
  export default class FENBoard {
    constructor(input: string);
    get board(): Array<Array>;
    get fen(): string;
    set fen(input: string): void;
    move(from: string, to: string): void;
    clear(square: string): void;
  }
}
