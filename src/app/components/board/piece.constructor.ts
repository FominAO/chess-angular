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

    getPossibleMoves() {
        const i = this.getIndex();
        let moves = [];
        switch (this._name) {
            case 'bishop':
                moves = this.getBishopPossibleMoves(i);
                break;
            case 'king':
                moves = this.getKingPossibleMoves(i);
                break;
            case 'knight':
                moves = this.getKnightPossibleMoves(i);
                break;
            case 'pawn':
                moves = this.getPawnPossibleMoves(i);
                break;
            case 'queen':
                moves = this.getQueenPossibleMoves(i);
                break;
            case 'rook':
                moves = this.getRookPossibleMoves(i);
                break;
        }
        return moves;
    }
    private getBishopPossibleMoves(i) {
        let result = [];
        const coords = this._gc(i);
        console.log(i, coords);
        
        for (let k = 1; (coords[0]+k <= 7) && (coords[1]+k <= 7); k++) {
            result.push(this._gi([coords[0]+k,coords[1]+k]))
        }
        console.log(1, ...result);
        
        for (let k = 1; (coords[0]-k >= 0) && (coords[1]-k >= 0); k++) {
            result.push(this._gi([coords[0]-k,coords[1]-k]))
        }
        console.log(2, ...result);
        for (let k = 1; (coords[0] - k >= 0) && (coords[1] + k <= 7); k++) {
            result.push(this._gi([coords[0] - k, coords[1] + k]))
        }
        console.log(3, ...result);
        for (let k = 1; (coords[1] - k >= 0) && (coords[0] + k <= 7); k++) {
            result.push(this._gi([coords[0] + k, coords[1] - k]))
        }
        console.log(4, ...result);

        return result;
    }
    private getRookPossibleMoves(i) {
        let result = [];
        const turn = {
            rep: true,
            move: [
                [0,1],
                [1,0],
                [-1,0],
                [0,-1],
            ]
        }
        const coords = {
            x: this._gc(i)[1],
            y: this._gc(i)[0],
        };
        turn.move.forEach( vec => {
            let coordsLocal = {
                x: coords.x,
                y: coords.y,
            };
            let count = 0;
            while ((this.isCoordsEqual(coords, coordsLocal) || turn.rep) && this.incrementPositionValid(coordsLocal, vec)) {
                console.log(this.isCoordsEqual(coords, coordsLocal));
                
                result.push(this._gi([coordsLocal.y, coordsLocal.x]))
                count++
                if (count > 100) {
                    console.log(count);
                    break;
                }
            }
        })
        return result;
    }
    isCoordsEqual(c1, c2) {
        console.log(c1,c2);
        
        return c1.x===c2.x && c1.y===c2.y;
    }
    incrementPositionValid(coords, vec) {
        coords.x += vec[1];
        coords.y += vec[0];

        if (coords.y >= 0 && coords.y <= 7 && coords.x >= 0 && coords.x <= 7) {
            return true;
        } else {
            return false;
        }

    }
    private getPawnPossibleMoves(i) {
        let result = [];
        return result;
    }
    private getKnightPossibleMoves(i) {
        let result = [];
        const turn = {
            rep: false,
            move: [
                [1,2],
                [-1,2],
                [1,-2],
                [-1,-2],
                [2,1],
                [-2,1],
                [2,-1],
                [-2,-1]
            ]
        }
        const coords = {
            x: this._gc(i)[1],
            y: this._gc(i)[0],
        };
        turn.move.forEach( vec => {
            let coordsLocal = {
                x: coords.x,
                y: coords.y,
            };
            let count = 0;
            while ((this.isCoordsEqual(coords, coordsLocal) || turn.rep) && this.incrementPositionValid(coordsLocal, vec)) {
                console.log(this.isCoordsEqual(coords, coordsLocal));
                
                result.push(this._gi([coordsLocal.y, coordsLocal.x]))
                count++
                if (count > 100) {
                    console.log(count);
                    break;
                }
            }
        })
        return result;
    }
    private getKingPossibleMoves(i) {
        let result = [];
        return result;
    }
    private getQueenPossibleMoves(i) {
        let result = [];
        return result;
    }
    private _gc = this._getCoordsFromIndex;
    private _getCoordsFromIndex(i): [any, any] {
        return [Math.floor(i/8), i%8]
    }
    private _gi = this._getIndexFromCoords;
    private _getIndexFromCoords([x,y]) {
        return x*8 + y;
    }
}