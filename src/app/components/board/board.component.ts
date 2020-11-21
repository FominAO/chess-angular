import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { HighlightsService } from '../highlights/highlights.service';
import { BoardPieceName } from './board-piece-name.interface';
import { BoardPiece } from './piece.constructor';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  DEFAULT_BOARD_MAP: BoardPieceName[] = [
    'rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook',
    'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook',
  ];
  chessBoard = [];
  highlights = [{type: 'active'}];
  _turn : 'black' | 'white' = 'white';
  timer;
  set turn(v: 'black' | 'white') {
    this._turn = v;
    clearInterval(this.timer);
    this.timer = setInterval(() => this.moveTimerBySec(v), 1000)
  };
  get turn(): 'black' | 'white' {
    return this._turn;
  }
  timeWhite = '0:00';
  timeBlack = '0:00';
  @Input() top;
  @Input() left;
  @Input() width;
  @Input() height;
  constructor(private highlightsService: HighlightsService) { }

  ngOnInit(): void {
    this.initDefaultBoard();
  }

  onEndDrag(event: {source: CdkDrag}) {
    let cellSize = this.width / 8;
    let offset: {x: number, y: number} = event.source._dragRef.getFreeDragPosition();
    let x = Math.round(offset.x / cellSize);
    let y = Math.round(offset.y / cellSize);
    if (x === 0 && y === 0) {
      event.source.reset();
      return;
    }
    this.movePieceByOffset(event.source.element.nativeElement.id, x, y);
    event.source.reset();
    this.highlightsService.resetSelection();
  }
  onMouseDown(piece) {
    this.highlightsService.highlightCellByIndex(piece.getIndex());
    this.highlightsService.highlightPath(piece.getPossibleMoves())

  }

  movePieceByOffset(id: string, x: number, y: number) {
    console.log(id, x, y);
    
    let currentPositionIndex = +id.split('_')[1];
    let nextPositionIndex = (currentPositionIndex + x) + 8 * y;

    this.makeTurn(currentPositionIndex, nextPositionIndex);
    
  }
  movePieces(piece: BoardPiece, nextPiece: BoardPiece) {
    const newChessBoard = Object.assign([], this.chessBoard);
    const nextPositionIndex = nextPiece.getIndex();
    const currentPositionIndex = piece.getIndex();
    let temp = nextPiece;
    piece.setNewIndex(nextPositionIndex);
    piece.setTouched();
    temp.setNewIndex(currentPositionIndex);
    temp.setTouched();
    newChessBoard[nextPositionIndex] = piece;
    newChessBoard[currentPositionIndex] = temp;
    
    this.chessBoard = newChessBoard;
  }

  getCurrentPiecePosition(id: string) {
    this.chessBoard.find(i => i.id === id)
  }

  initDefaultBoard() {
    this.chessBoard = this.DEFAULT_BOARD_MAP.map( (i, index) =>  {
      return new BoardPiece(i, index);
    })
  }

  makeTurn(pieceIndex: number, nextPieceIndex: number) {
    const piece: BoardPiece = this.chessBoard[pieceIndex];
    const nextPiece: BoardPiece = this.chessBoard[nextPieceIndex];
    if (piece.color !== this.turn) {
      console.log('нельзя');
      return;
    }
    if (this.checkCastling(piece, nextPiece)) {
      this.movePieces(piece, nextPiece);
      console.log('castling');
      
      this.toggleTurn();
      return;
    }
    
    if (nextPiece.name) {
      this.killPiece(piece, nextPiece);
      console.log('kill');
    } else {
      this.movePieces(piece, nextPiece);
      console.log('move');
    }
    this.toggleTurn();
  }
  checkCastling(piece: BoardPiece, nextPiece: BoardPiece) {
    if (piece.color !== nextPiece.color) {
      return false;
    }
    if (
          ((piece.name === 'king' && nextPiece.name === 'rook')
          || (nextPiece.name === 'king' && piece.name === 'rook'))
        &&
          (!piece.touched && !nextPiece.touched)
      ) {
        console.log('try castling');
        // WRONG
        return true;
      } else {
        return false;
      }
  }
  killPiece(piece: BoardPiece, nextPiece: BoardPiece) {
    const newChessBoard = Object.assign([], this.chessBoard);
    const nextPositionIndex = nextPiece.getIndex();
    const currentPositionIndex = piece.getIndex();
    const emptyCell: BoardPiece = new BoardPiece('', currentPositionIndex);
    piece.setNewIndex(nextPositionIndex);
    piece.setTouched();
    newChessBoard[nextPositionIndex] = piece;
    newChessBoard[currentPositionIndex] = emptyCell;
    
    this.chessBoard = newChessBoard;
  }
  clickOnPiece(piece: BoardPiece) {
    // this.highlightsService.highlightPath(piece.getPossibleMoves())
    // this.highlightsService.highlightCellByIndex(piece.getIndex())
  }
  toggleTurn() {
    this.turn = this.turn === 'white' ? 'black' : 'white';
  }
  moveTimerBySec(turn) {
    if (turn === 'black') {
      this.timeBlack = this.addSecondToString(this.timeBlack);
    } else {
      this.timeWhite = this.addSecondToString(this.timeWhite);
    }
  }
  getSecondsFromString(str: string) {
    return +str.split(':')[0]*60 + +str.split(':')[1];
  }
  transformSecondsToString(s: number) {
    let seconds = s % 60;
    let minutes = (s - seconds) / 60;
    return `${minutes}:${seconds > 9 ? seconds : '0' + seconds.toString()}`
  }
  addSecondToString(str) {
    return this.transformSecondsToString(this.getSecondsFromString(str) + 1);    
  }

  ////

  
}
