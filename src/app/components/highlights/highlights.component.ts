import { Component, Input, OnInit } from '@angular/core';
import { HighlightsService } from './highlights.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent implements OnInit {
  @Input() highlights = [];
  constructor(private service: HighlightsService) { }

  ngOnInit(): void {
    this.service.highlights.subscribe( state => {
      console.log(state);
      
      this.highlights = state;
    })
  }

}
