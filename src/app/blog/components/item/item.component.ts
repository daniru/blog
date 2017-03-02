import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'dr-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  public blog: Blog;
  private _blogSubscription: Subscription;

  constructor(public route: ActivatedRoute, public router: Router, public blogService: BlogService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const key = params['key'];
      this.blogService.getBlog(key).subscribe((data: any) => {
          if (data) {
            this.blog = data;
          } else if (data === undefined) {
            this.router.navigate(['/']);
          }
        });
    });
  }

  ngOnDestroy() {
    if (this._blogSubscription) { this._blogSubscription.unsubscribe(); }
  }
}
