import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

declare const DISQUS: any;

@Component({
  selector: 'dr-item-comments',
  templateUrl: './item-comments.component.html',
  styleUrls: ['./item-comments.component.scss']
})
export class ItemCommentsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    const s = this.document.createElement('script');
    s.src = '//daniru.disqus.com/embed.js';
    s.setAttribute('data-timestamp', new Date().toString());
    (this.document.head || this.document.body).appendChild(s);
  }
}
