import { Component, Input, OnChanges } from '@angular/core';
import { Blog } from '../../models/blog';
import { Section } from '../../models/section';

@Component({
  selector: 'dr-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnChanges {

  @Input() blog: Blog;
  public firstSection: Section;

  ngOnChanges() {
    if (this.blog) {
      this.firstSection = this.blog.sections.find((x) => x.order === 1);
    }
  }
}
