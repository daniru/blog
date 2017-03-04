import { Component, OnChanges, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Blog } from '../../models/blog';

const window: any = {};

@Component({
  selector: 'dr-item-header',
  templateUrl: './item-header.component.html',
  styleUrls: ['./item-header.component.scss']
})
export class ItemHeaderComponent implements OnChanges {

  @Input() blog: Blog;
  @Input() headerLink: boolean;

  public socialLinks: any[];

  constructor(@Inject(DOCUMENT) private document: any) {
    this.socialLinks = [];
  }

  ngOnChanges() {
    if (this.blog) {
      this._populateSocialLinks();
    }
  }

  private _populateSocialLinks() {
      const shareText = `Have a look the new post by daniru ${this.blog.title}`;
      const shareLink = `${this.document.location.href}${this.blog.key}`;

      this.socialLinks = [
        { url: `https://plus.google.com/share?url=${shareLink}`, icon: 'fa fa-google' },
        { url: `https://www.facebook.com/sharer.php?u=${shareLink}&amp;t=${shareText}`, icon: 'fa fa-facebook'  },
        { url: `https://twitter.com/share?text=${shareText}`, icon: 'fa fa-twitter'   },
        { url: `http://pinterest.com/pin/create/button/?url=${shareLink}&amp;description=${shareText}`, icon: 'fa fa-pinterest' },
        { url: `http://www.linkedin.com/shareArticle?mini=true&amp;url={{shareLink}}&amp;title=${shareText}`, icon: 'fa fa-linkedin'  }
      ];
  }

}
