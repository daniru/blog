import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'dr-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() page: number;
  @Input() pages: number[];
  @Output() pageChange = new EventEmitter();

  setPage(num: number) {
    this.pageChange.emit(num);
  }
}
