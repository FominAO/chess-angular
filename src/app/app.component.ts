import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chess-angular';

  loaded = false;

  BOARD_POSITION_OFFSET_X = 1442/492;
  BOARD_POSITION_OFFSET_Y = 811/270;
  BOARD_X_RATIO = 1442/454;
  BOARD_Y_RATIO = 811/454;


  @Input() top;
  @Input() left;
  @Input() width;
  @Input() height;
  constructor() {}

  ngOnInit() {
    
    
  }
  initBoard() {
    let img = document.getElementById('background-image');
    this.top = img.clientHeight / this.BOARD_POSITION_OFFSET_Y;
    this.left = img.clientWidth / this.BOARD_POSITION_OFFSET_X;
    this.height = img.clientHeight / this.BOARD_Y_RATIO;
    this.width = img.clientWidth / this.BOARD_X_RATIO;
    console.log(this.top, this.left, this.height, this.width);
    this.loaded = true;
  }
}
