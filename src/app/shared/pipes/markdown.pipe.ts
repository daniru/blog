import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as MarkdownIt from 'markdown-it';

declare var require: any;
const markdownItAttrs = require('markdown-it-attrs');

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(data: string): SafeHtml {
    if (data) {
      const md = new MarkdownIt();
      md.use(markdownItAttrs);
      return this.sanitizer.bypassSecurityTrustHtml(md.render(data));
    } else {
      return this.sanitizer.bypassSecurityTrustHtml('No Data');
    }
  }
}
