import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'button[ch-button], input[ch-button], a[ch-button]',
  exportAs: 'ch-button'
})
export class ButtonDirective implements AfterViewInit {

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  public ngAfterViewInit(): void {
    this._renderer.addClass(this._elementRef.nativeElement, 'chess-btn');
  }
  private _setImages() {
    // const color = this._elementRef.nativeElement.style;
    // this._spinnerHTML.className = 'spinner-button';
    // this._spinnerHTML.innerHTML = `
    // <div class="spinner-container">
    //   <!--suppress HtmlUnknownAttribute -->
    //   <div class="wb-button-spinner" mode="indeterminate" role="progressbar" style="width: 22px;height: 22px;">
    //     <svg focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" style="width: 22px;height: 22px;">
    //       <circle cx="50%" cy="50%" r="45" style="animation-name: mat-progress-spinner-stroke-rotate-100; stroke-dasharray: 282.743px; stroke-width: 10%;"></circle>
    //     </svg>
    //   </div>
    // </div>`;
    // this._spinnerHTML.style.backgroundColor = color;
    // this._renderer.appendChild(this._elementRef.nativeElement, this._spinnerHTML);
  }
}