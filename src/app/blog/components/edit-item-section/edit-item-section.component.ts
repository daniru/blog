import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'dr-edit-item-section',
  templateUrl: './edit-item-section.component.html',
  styleUrls: ['./edit-item-section.component.scss']
})
export class EditItemSectionComponent {

  @Input() form: FormGroup;
  @Input() showSwap: boolean;
  @Output() moveSwap = new EventEmitter();
  @Output() deleteSection = new EventEmitter();
  @Output() addSection = new EventEmitter();

  public editText: boolean;

  constructor(private _elementRef: ElementRef) {
    this.editText = false;
  }

  onSwapSection() {
    this.moveSwap.emit();
  }

  onDeleteSection() {
    this.deleteSection.emit();
  }

  onAddSection() {
    this.addSection.emit();
  }

  onTextClick(e: any, el: any) {
    this.editText = true;
    setTimeout((x) => {
      this._elementRef.nativeElement.querySelector('textarea').focus();
    }, 100);
  }

  onTextAreaFocusOut() {
    this.editText = false;
  }

}

