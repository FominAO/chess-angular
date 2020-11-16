import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss']
})
export class ModalMenuComponent implements OnInit {
  @Input() title: string;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  _toggleClose() {
    this.close.emit()
  }

}
