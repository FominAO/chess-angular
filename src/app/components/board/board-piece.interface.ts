import { BoardPieceName } from './board-piece-name.interface';
import { BoardPieceColor } from './board-piece-color.interface';

export interface IBoardPiece {
    id: string;
    color: BoardPieceColor;
    name: BoardPieceName;
    touched?: boolean;
}