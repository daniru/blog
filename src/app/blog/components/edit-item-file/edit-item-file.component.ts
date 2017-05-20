import { Component, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'dr-edit-item-file',
  templateUrl: './edit-item-file.component.html',
  styleUrls: ['./edit-item-file.component.scss']
})
export class EditItemFileComponent {
  @Input() form: FormGroup;
  @Input() showSwap: boolean;
  @Output() moveSwap = new EventEmitter();
  @Output() deleteFile = new EventEmitter();

  public editFile: boolean;

  constructor(private _elementRef: ElementRef) {
    this.editFile = false;
  }

  onTextClick() {
    this.editFile = true;
  }

  onFinishEdit() {
    this.editFile = false;
  }

  onSwapFile() {
    this.moveSwap.emit();
  }

  onDeleteFile() {
    this.deleteFile.emit();
  }

}
