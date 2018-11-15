import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() {
    
  }

  public init(): Observable<boolean> {
    return new Observable((observable) => {
      const id = 'facebook-jssdk';
    
      if(document.getElementById(id)) {
        return;
      }
  
      let js = document.createElement('script');
      js.id = id;
      js.async = true;
      js.src = '//connect.facebook.net/en_US/sdk.js';
  
      const ref = document.getElementsByTagName('script')[0];
      ref.parentNode.insertBefore(js, ref);
      js.onload = (results) => {
        console.log(results);
        this.initSDK();
        observable.next(FB !== undefined);
      };
    });

  }

  protected initSDK(): void {
    FB.init({
      appId: '1506160406128628',
      autoLogAppEvents : true,
      xfbml: true,
      version: 'v3.2'
    })
  }
// https://github.com/zyra/ngx-facebook/blob/master/src/providers/facebook.ts
// https://gist.github.com/gcphost/872e798511a234ca419025337111ea16
  public getLoginStatus(forceFreshResponse?: boolean): Observable<any> {
    return new Observable((observable) => {
      try {

        FB.getLoginStatus((response: LoginStatue) => {
          if (!response) {
            observable.error();
          } else {
            observable.next(response);
          }
        }, forceFreshResponse);

      } catch (e) {
        observable.error(e);
      }
    });
  }
}
