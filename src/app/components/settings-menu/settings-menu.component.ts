import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent implements OnInit {
  opened = false;
  constructor() { }

  ngOnInit(): void {
  }

  open() {
    this.opened = true;
  }
  close() {
    this.opened = false;
  }
}
