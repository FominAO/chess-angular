import { BoardPieceName } from './board-piece-name.interface';
import { BoardPieceColor } from './board-piece-color.interface';

export class PieceTurn {
    initFigure(name) {
        switch (name) {
            case 'bishop':
                return {
                    rep: true,
                    vectors: [
                        {x:1, y:1},{x:-1, y:-1},{x:-1, y:1},{x:1, y:-1},
                    ]
                }
                break;
            case 'king':
                return {
                    rep: false,
                    vectors: [
                        {x:1, y:1},{x:-1, y:-1},{x:-1, y:1},{x:1, y:-1},
                    ]
                }
                break;
            case 'knight':
                return {
                    rep: false,
                    vectors: [
                        {x:1, y:2},{x:-1, y:2},{x:-1, y:-2},{x:1, y:-2},
                        {x:2, y:1},{x:-2, y:-1},{x:-2, y:1},{x:2, y:-1},
                    ]
                }
                break;
            case 'pawn_white':
                return {
                    rep: false,
                    vectors: [
                        {x:0, y:1},
                    ]
                } 
                break;
            case 'pawn_black':
                return {
                    rep: false,
                    vectors: [
                        {x:0, y:-1},
                    ]
                } 
                break;
            case 'pawn_white_first':
                return {
                    rep: false,
                    vectors: [
                        {x:0, y:1},{x:0, y:2},
                    ]
                } 
                break;
            case 'pawn_black_first':
                return {
                    rep: false,
                    vectors: [
                        {x:0, y:-1},{x:0, y:-2},
                    ]
                } 
                break;
            case 'queen':
                return {
                    rep: true,
                    vectors: [
                        {x:1, y:1},{x:-1, y:-1},{x:-1, y:1},{x:1, y:-1},
                        {x:0, y:1},{x:0, y:-1},{x:-1, y:0},{x:1, y:0},
                    ]
                } 
                break;
            case 'rook':
                return {
                    rep: true,
                    vectors: [
                        {x:0, y:1},{x:0, y:-1},{x:-1, y:0},{x:1, y:0},
                    ]
                } 
                break;
        }
    }
}