import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatisticMenuComponent } from './components/statistic-menu/statistic-menu.component';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { PieceComponent } from './components/piece/piece.component';
import { StartMenuComponent } from './components/start-menu/start-menu.component';
import { BoardComponent } from './components/board/board.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { ChessButtonModule } from './shared/button.module';
import { ModalMenuModule } from './shared/modal-menu/modal-menu.module';

@NgModule({
  declarations: [
    AppComponent,
    StatisticMenuComponent,
    SettingsMenuComponent,
    PieceComponent,
    StartMenuComponent,
    BoardComponent,
    HighlightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ChessButtonModule,
    ModalMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
