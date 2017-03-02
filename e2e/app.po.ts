import { browser, element, by } from 'protractor';

export class BlogPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dr-root h1')).getText();
  }
}
