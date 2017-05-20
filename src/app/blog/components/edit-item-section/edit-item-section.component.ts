import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { File } from '../../models/file';

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
  @Output() addFile = new EventEmitter();

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

  onAddFile() {
    this.addFile.emit();
  }

  onSwapFile(order: any) {
    const control = <FormArray>this.form.controls['files'];
    const values = <File[]>control.getRawValue();
    const obj1 = values.find((x) => x.order === order);
    const obj2 = values.find((x) => x.order === order + 1);
    if (obj1 && obj2) {
      obj1.order ++;
      obj2.order --;
      control.patchValue(values);
    }
  }

  onDeleteFile(order: any) {
    this._deleteFile(order);
  }

  private _deleteFile(order: any) {
    const control = <FormArray>this.form.controls['files'];
    const index = control.getRawValue().findIndex((x) => x.order === order);
    control.removeAt(index);
    const values = <File[]>control.getRawValue();
    values.forEach((x) => { if (x.order >= order) { x.order--; }});
    control.patchValue(values);
  }
}

