import { Component, Input } from '@angular/core';
import { Blog } from '../../models/blog';

@Component({
  selector: 'dr-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent{

  @Input() blog: Blog;

}
