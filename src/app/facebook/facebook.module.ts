import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookConfig } from '../services';
import { FacebookService } from '../services/facebook.service';

const FacebookConfigService = new InjectionToken<FacebookConfig>('FacebookConfig');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class FacebookModule {
  static forRoot(config: any) {
    return {
      ngModule: FacebookModule,
      providers: [
        FacebookService,
        {
          provide: FacebookConfigService,
          useValue: config
        }
      ]
    }
  }
}
