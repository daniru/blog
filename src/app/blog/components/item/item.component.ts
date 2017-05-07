import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'dr-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  public blog: Blog;
  public editMode: boolean;
  private _blogSubscription: Subscription;

  constructor(public route: ActivatedRoute, public router: Router, public blogService: BlogService, public authService: AuthService) { }

 ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const key = params['key'];
      if (key === 'new') {
        this.blog = null;
        this.editMode = true;
      } else {
        this._blogSubscription = this.blogService.getBlog(key).subscribe(data => this.blog = data);
      }
    });
  }

  ngOnDestroy() {
    if (this._blogSubscription) { this._blogSubscription.unsubscribe(); }
  }

  onEditClick() {
    if (this.authService.user.isAdmin) {
      this.editMode = true;
    }
  }

  onSave() {
    if (this.authService.user.isAdmin) {
      if (this.blog) {
        console.log('saving', this.blog.key);
      } else {
        console.log('creating new blog');
        this.router.navigate(['/']);
      }
      this.editMode = false;
    }
  }

  onDelete() {
    if (this.authService.user.isAdmin) {
      console.log('deleting', this.blog.key);
    }
  }
}