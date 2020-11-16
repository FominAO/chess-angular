import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMenuComponent } from './modal-menu.component';
import { ChessButtonModule } from '../button.module';

@NgModule({
  imports: [
    CommonModule,
    ChessButtonModule
  ],
  declarations: [ModalMenuComponent],
  exports: [ModalMenuComponent]
})
export class ModalMenuModule {}