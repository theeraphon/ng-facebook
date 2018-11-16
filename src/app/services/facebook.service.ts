import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// https://developers.facebook.com/docs/facebook-login/web
export enum LoginStatus {
  connected = 'connected',            //  The person is logged into Facebook,
                                      //  and has logged into your app.
  not_authorized = 'not_authorized',  //  The person is logged into Facebook,
                                      //  but has not logged into your app.
  unknown = 'unknown'                 //  The person is not logged into Facebook,
                                      //  so you don't know if they've logged into your app.
}

export interface LoginStatue {
  status: LoginStatus;
    authResponse: {
      accessToken: string,
      expiresIn: string,
      reauthorize_required_in: string,
      signedRequest: string,
      userID: string
  };
}

export enum ApiMethod {
  Get = 'get',
  Post = 'post',
  Delete = 'delete'
}

declare const FB: any;
@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() {

  }

  public init(isDebug?: boolean): Observable<boolean> {
    return new Observable((observer) => {
      const id = 'facebook-jssdk';

      if (document.getElementById(id)) {
        return;
      }

      const js = document.createElement('script');
      js.id = id;
      js.async = true;
      js.src = isDebug ? 'https://connect.facebook.net/en_US/sdk/debug.js'
                      : 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';

      const ref = document.getElementsByTagName('script')[0];
      ref.parentNode.insertBefore(js, ref);
      js.onload = (results) => {
        console.log(results);
        this.initSDK();
        observer.next(FB !== undefined);
      };
    });

  }

  protected initSDK(): void {
    FB.init({
      appId: '1506160406128628',
      autoLogAppEvents : true,
      xfbml: true,
      version: 'v3.2'
    });

    FB.AppEvents.logPageView();
  }

  // https://github.com/zyra/ngx-facebook/blob/master/src/providers/facebook.ts
  // https://gist.github.com/gcphost/872e798511a234ca419025337111ea16
  // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
  public getLoginStatus(forceFreshResponse?: boolean): Observable<LoginStatue> {
    return new Observable((observer) => {
      try {

        FB.getLoginStatus((response: LoginStatue) => {
          if (!response) {
            observer.error();
          } else {
            observer.next(response);
          }
        }, forceFreshResponse);

      } catch (e) {
        observer.error(e);
      }
    });
  }

  public login(): Observable<any> {
    return new Observable((observer) => {
      try {
        FB.login((response) => {
          if (response.authResponse) {

          }
        });
      } catch (e) {
        observer.error(e);
      }
    });
  }

  // see Reference https://developers.facebook.com/docs/javascript/reference/FB.api
  public api(path: string, method = ApiMethod.Get, params: any = {}): Observable<any> {
    return new Observable((observer) => {
      try {
        FB.api(path, method, params, (response: any) => {
          if (!response) {
            observer.error();
          } else if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response);
          }

        });

      } catch (e) {
        observer.error(e);
      }
    });
  }

  public getUserInfo(userId = 'me'): Observable<any> {
    return this.api(`/${userId}`, ApiMethod.Get);
  }

  public getUserPicture(userId = 'me'): Observable<any> {
    return this.api(`/${userId}/picture?redirect=false`, ApiMethod.Get);
  }
}
