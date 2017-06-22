import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'dr-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // list of blogs in the view
  public list: Observable<Array<Blog>>;

  // injecting blogService in the components
  constructor(public blogService: BlogService) {}

  // populating the initial data in the inizialiazation of the component
  ngOnInit() {
     this.list = this.blogService.getBlogs();
  }

  updatePage(page: number) {
    this.blogService.setPage(page);
  }

}
