import { FacebookModule } from './facebook.module';

describe('FacebookModule', () => {
  let facebookModule: FacebookModule;

  beforeEach(() => {
    facebookModule = new FacebookModule();
  });

  it('should create an instance', () => {
    expect(facebookModule).toBeTruthy();
  });
});
