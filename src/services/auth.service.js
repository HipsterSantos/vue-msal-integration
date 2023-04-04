import * as Msal from 'msal';

export default class AuthService {
  constructor() {
    let PROD_REDIRECT_URI = 'https://sunilbandla.github.io/vue-msal-sample/';
    let redirectUri = window.location.origin;
    if (window.location.hostname !== '127.0.0.1') {
      // redirectUri = PROD_REDIRECT_URI;
    }
    this.applicationConfig = {
      clientID: '8a714e9c-61dd-4a7f-b8b1-da79a652446f',
      graphScopes: ['user.read','user.readbasic.all']
    };
    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      '',
      () => {
        // callback for login redirect
      },
      {
        redirectUri
      }
    );
  }
  login() {
    return this.app.loginPopup(this.applicationConfig.graphScopes).then(
      idToken => {
        const user = this.app.getUser();
        if (user) {
          debugger
          return user;
        } else {
          return null;
        }
      },
      () => {
        return null;
      }
    );
  };
  logout() {
    this.app.logout();
  };
  getToken() {
    return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
      accessToken => {
        debugger
        return accessToken;
      },
      error => {
        return this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes)
          .then(
            accessToken => {
              debugger
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  };
}
