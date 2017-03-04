import { Component, Input, OnChanges } from '@angular/core';
import { File } from './../../models/file';

@Component({
  selector: 'dr-item-files',
  templateUrl: './item-files.component.html',
  styleUrls: ['./item-files.component.scss']
})
export class ItemFilesComponent {

  @Input() files: File[];

  getClass(file: File): string {
    if (!file.name) { return ''; }

    const split = file.name.split('.');
    const extension = split[split.length - 1];
    switch (extension) {
      default: return `file lang-${extension}`;
    }
  }
}
