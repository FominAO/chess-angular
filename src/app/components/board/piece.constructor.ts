import { BoardPieceColor } from './board-piece-color.interface';
import { BoardPieceName } from './board-piece-name.interface';
import { PieceTurn } from './piece-turn';
import { IPieceTurn } from './piece-turn.interface';


export class BoardPiece {
    private _name: BoardPieceName = '';
    private _color: BoardPieceColor = '';
    private _id: string;
    private _touched = false;
    private _turn: IPieceTurn;
    get name(): BoardPieceName {
        return this._name;
    }
    get color(): BoardPieceColor {
        return this._color;
    }
    get id(): string {
        return this._id;
    }
    get touched(): boolean {
        return this._touched;
    }
    constructor(name: BoardPieceName, index: number) {
        this._name = name;
        this._color = name ? (index > 16 ? 'black' : 'white') : '';
        this._id = this.name + this.color + '_' + index;
        if (name === 'pawn') {
            this._turn = new PieceTurn().initFigure(`${name}_${this.color}_first`);
        } else {
            this._turn = new PieceTurn().initFigure(name);
        }
    }
    
    private emptyPiece() {
        return {}
    }
    getIndex(): number {
        return +this._id.split('_')[1];
    }

    setNewIndex(id: number) {
        this._id = this.name + this.color + '_' + id;
        if (this._name === 'pawn') {
            this._turn = new PieceTurn().initFigure(`${this._name}_${this.color}`);
        }
    }
    setTouched() {
        this._touched = !this.touched;
    }

    getPossibleMoves() {
        const i = this.getIndex();
        let result = [];
        const coords = this._gc(i);
        this._turn.vectors.forEach( vec => {
            let coordsLocal = {
                x: coords.x,
                y: coords.y,
            };
            while (
                (this.isCoordsEqual(coords, coordsLocal) || this._turn.rep)
                && this.incrementPositionValid(coordsLocal, vec)
                ) {
                result.push(this._gi(coordsLocal))
            }
        })
        return result;
    }
    isCoordsEqual(c1, c2) {
        return c1.x===c2.x && c1.y===c2.y;
    }
    incrementPositionValid(coords, vec) {
        coords.x += vec.x;
        coords.y += vec.y;

        if (coords.y >= 0 && coords.y <= 7 && coords.x >= 0 && coords.x <= 7) {
            return true;
        } else {
            return false;
        }

    }
    private _gc = this._getCoordsFromIndex;
    private _getCoordsFromIndex(i): {x: number, y: number} {
        return {
            y: Math.floor(i / 8),
            x: i % 8
        }
    }
    private _gi = this._getIndexFromCoords;
    private _getIndexFromCoords({x, y}) {
        return y * 8 + x;
    }
}