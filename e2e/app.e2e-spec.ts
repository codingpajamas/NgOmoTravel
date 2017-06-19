import { OmotestPage } from './app.po';

describe('omotest App', () => {
  let page: OmotestPage;

  beforeEach(() => {
    page = new OmotestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
