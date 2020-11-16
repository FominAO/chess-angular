import { BoardPieceColor } from './board-piece-color.interface';
import { BoardPieceName } from './board-piece-name.interface';


export class BoardPiece {
    private _name: BoardPieceName = '';
    private _color: BoardPieceColor = '';
    private _id: string;
    private _touched = false;
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
    }

    private emptyPiece() {
        return {}
    }
    getIndex(): number {
        return +this._id.split('_')[1];
    }

    setNewIndex(id: number) {
        this._id = this.name + this.color + '_' + id;
    }
    setTouched() {
        this._touched = !this.touched;
    }
}