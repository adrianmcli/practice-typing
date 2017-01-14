import { PracticeTypingPage } from './app.po';

describe('practice-typing App', function() {
  let page: PracticeTypingPage;

  beforeEach(() => {
    page = new PracticeTypingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
