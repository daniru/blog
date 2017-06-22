import { MarkdownPipe } from './markdown.pipe';

const domSanitizerStub = {
  bypassSecurityTrustHtml: (value) => { return value; },
};

describe('MarkdownPipe', () => {

  it('should create an instance', () => {
    const pipe = new MarkdownPipe(<any>domSanitizerStub);
    expect(pipe).toBeTruthy();
  });

  it('should transform text', () => {
    const pipe = new MarkdownPipe(<any>domSanitizerStub);
    const resultHello: any = pipe.transform('**hello**')
    expect(resultHello.trim()).toBe('<p><strong>hello</strong></p>');
  });

  it('should show "No Data" with no input', () => {
    const pipe = new MarkdownPipe(<any>domSanitizerStub);
    const resultHello: any = pipe.transform(null)
    expect(resultHello.trim()).toBe('No Data');
  });

});
