import { BoardPieceName } from './board-piece-name.interface';
import { BoardPieceColor } from './board-piece-color.interface';

export interface IPieceTurn {
    rep: boolean;
    vectors: IPieceTurnVector[]; 
}

export interface IPieceTurnVector {
    x: number,
    y: number
}