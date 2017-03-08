import { Subscription } from 'rxjs/Subscription';
import { Observable, Subject } from 'rxjs/Rx';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private _adminIds: string[] = environment.adminIds || ['oITo9pyPViUfZDGqY9h8x2XSKLG3'];
  public userSubject: Subject<User>;
  public user: User;

  constructor(private af: AngularFire) {
    this.userSubject = new Subject<User>();
    this._proccessAuthState(null);
    this.af.auth.subscribe((x) => this._proccessAuthState(x) );
  }

  login(provider: string): Observable<string> {
    const fbProvider = this._getProvider(provider);
    if (fbProvider !== null) {
      return Observable.fromPromise(
        <Promise<FirebaseAuthState>>this.af.auth.login({
          provider: fbProvider,
          method: AuthMethods.Popup
        }))
      .map((x) => { return null; })
      .catch((x: firebase.auth.Error) => {
        return Observable.of(x.message);
      });
    } else {
      return Observable.of('No provider');
    }
  }

  logout() {
     this.af.auth.logout();
  }

  private _getProvider(provider: string): AuthProviders {
    switch (provider) {
      case 'github': return AuthProviders.Github;
      case 'google': return AuthProviders.Google;
      case 'twitter': return AuthProviders.Twitter;
      default: return null;
    }
  }

  private _proccessAuthState(authState: FirebaseAuthState): void {
    if (authState !== null && authState.google) {
      this.user = {
        isLogged: true,
        isAdmin: this._adminIds.indexOf(authState.uid) >= 0,
        name: authState.google.displayName,
        image: authState.google.photoURL
      };
    } else if (authState !== null && authState.twitter) {
      this.user = {
        isLogged: true,
        isAdmin: this._adminIds.indexOf(authState.uid) >= 0,
        name: authState.twitter.displayName,
        image: authState.twitter.photoURL
      };
    } else if (authState !== null && authState.github) {
      this.user = {
        isLogged: true,
        isAdmin: this._adminIds.indexOf(authState.uid) >= 0,
        name: authState.github.displayName,
        image: authState.github.photoURL
      };
    } else {
      this.user = { isLogged: false, isAdmin: false, name: null, image: null };
    }
    this.userSubject.next(this.user);
  }

}
