import { PrettyfilePipe } from './prettyfile.pipe';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

const domSanitizerStub = {
  bypassSecurityTrustHtml: (value) => { return value; },
};

describe('PrettyfilePipe', () => {

  it('should create an instance', () => {
    const pipe = new PrettyfilePipe(<any>domSanitizerStub);
    expect(pipe).toBeTruthy();
  });

  it('should transform HTML code', () => {
    const pipe = new PrettyfilePipe(<any>domSanitizerStub);
    const resultHello = pipe.transform('hello', 'index.html')
    expect(resultHello).toBe('<span class="pln">hello</span>');
  });

  it('should transform HTML code when no filename', () => {
    const pipe = new PrettyfilePipe(<any>domSanitizerStub);
    const resultHello = pipe.transform('hello', null)
    expect(resultHello).toBe('<span class="pln">hello</span>');
  });

  it('should transform HTML code when filename incomplete', () => {
    const pipe = new PrettyfilePipe(<any>domSanitizerStub);
    const resultHello = pipe.transform('hello', 'index');
    expect(resultHello).toBe('<span class="pln">hello</span>');
  });

  it('should transform SCSS code', () => {
    const pipe = new PrettyfilePipe(<any>domSanitizerStub);
    const resultHello = pipe.transform('.body', 'index.scss')
    expect(resultHello).toBe(`<span class="pun">.</span><span class="pln">body</span>`);
  });

  it('should transform HTML and escape "', () => {
    const pipe = new PrettyfilePipe(<any>domSanitizerStub);
    const resultHello = pipe.transform('hello"', 'index');
    expect(resultHello).toBe('<span class="pln">hello</span><span class="str">"</span>');
  });

});
