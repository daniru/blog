import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'dr-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  // list of blogs in the view
  public list: Blog[];
  private _blogSubscription: Subscription;

  // injecting blogService in the components
  constructor(public blogService: BlogService) { }

  // populating the initial data in the inizialiazation of the component
  ngOnInit() {
     this._blogSubscription = this.blogService.getBlogs().subscribe(items => { this.list = items; });
  }

  ngOnDestroy() {
    if (this._blogSubscription) { this._blogSubscription.unsubscribe(); }
  }
}
