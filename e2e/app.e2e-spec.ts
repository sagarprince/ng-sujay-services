import { SujayServicesPage } from './app.po';

describe('sujay-services App', () => {
  let page: SujayServicesPage;

  beforeEach(() => {
    page = new SujayServicesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
