import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Highlight } from './highlight.interface';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {
  EMPTY_HIGHLIGHTS: Highlight[] = (new Array(64).fill('').map(i => { return {type: ''}}))
  highlights: BehaviorSubject<Highlight[]> = new BehaviorSubject(this.EMPTY_HIGHLIGHTS)
  
  constructor() { }

  highlightCellByIndex(index) {
    let newHighlights = this.highlights.getValue();
    newHighlights = newHighlights.map( i => {
      if (i.type === 'active') {
        i.type = '';
      }
      return i;
    });
    newHighlights[index] = {type: 'active'};
    this.highlights.next(newHighlights);
  }

  cleanHighlights() {
    this.highlights.next(this.EMPTY_HIGHLIGHTS);
  }
  resetSelection() {
    let newHighlights = this.highlights.getValue();
    newHighlights = newHighlights.map( i => {
 
        i.type = '';

      return i;
    });
    this.highlights.next(newHighlights);
  }
  highlightPath(path: number[]) {
    let newHighlights = this.highlights.getValue();
    
    newHighlights = newHighlights.map( (cell, index) => {
      if (cell.type === 'path') {
        cell.type = '';
      }
      if (path.includes(index)) {
        cell.type = 'path';
      }
      return cell;
    });
  } 
}
