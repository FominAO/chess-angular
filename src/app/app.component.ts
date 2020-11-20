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
  BOARD_POSITION_OFFSET_Y = 1442/268;
  BOARD_POSITION_SIZE_OFFSET_Y = 860/258;
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
    let resizeRatio = 1;
    if (img.clientWidth / img.clientHeight > (16/1)) {  
      resizeRatio = (16/9) / (img.clientWidth / img.clientHeight);
    }
    this.top = (img.clientWidth / this.BOARD_POSITION_OFFSET_Y) - (img.clientWidth*(9/16) - img.clientHeight)/2;
    this.left = img.clientWidth / this.BOARD_POSITION_OFFSET_X;
    this.width = img.clientWidth / this.BOARD_X_RATIO;
    this.height = this.width;
    console.log(this.top, this.left, this.height, this.width, resizeRatio);
    this.loaded = true;
  }
}
