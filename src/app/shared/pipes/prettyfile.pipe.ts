
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare const require: any;
const PR = require('google-code-prettify/bin/prettify.min');

@Pipe({
  name: 'prettyfile'
})
export class PrettyfilePipe implements PipeTransform {

  private _entityMap: any = {
    '<': `&lt;`,
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '&': '&amp;',
  };

  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string, filename: string): SafeHtml {
    const language = this._getLanguage(filename);
    let text = this._escapeHtml(content);

    text = PR.prettyPrintOne(text, language, false);
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  private _getLanguage(filename: string): string {
    if (!filename) { return ''; }
    const split = filename.split('.');
    if (split.length <= 1) { return ''; }
    const extension = split[split.length - 1];
    switch (extension) {
      case 'scss': return 'css';
      default: return `${extension}`;
    }
  }

  private _escapeHtml(string: string): string {
    return String(string).replace(/[&<>"'`=\/]/g, (s) => this._entityMap[s] );
  }
}
