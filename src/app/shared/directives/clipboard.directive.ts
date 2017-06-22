import { Directive, OnInit, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
import * as Clipboard from 'clipboard';

@Directive({
  selector: '[drClipboard]'
})
export class ClipboardDirective  {

  @Input() text: string;
  private _button: any;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this._button) {
      this._button = this._renderer.createElement('button');
      this._button.innerHTML = 'copy';
      this._button.className = 'copybutton mat-accent mat-raised-button';
      this._element.nativeElement.append(this._button);
      console.log(this._element)
      this._renderer.listen(this._button, 'click', () => { this._copyToClipboard(); return true; });
    } else {
      this._button.className = 'copybutton mat-accent mat-raised-button';
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this._button) {
      this._button.className = 'hiddenbutton';
    }
  }

  constructor(private _element: ElementRef, private _renderer: Renderer2) { }

  private _copyToClipboard() {
    const clipboard = new Clipboard(this._element.nativeElement, { text: () => this.text });
    clipboard.on('success', (e) => { clipboard.destroy(); });
  }
}
