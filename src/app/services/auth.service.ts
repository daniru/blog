import { Subscription } from 'rxjs/Subscription';
import { Observable, Subject } from 'rxjs/Rx';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private _adminIds: string[] = environment.adminIds || ['oITo9pyPViUfZDGqY9h8x2XSKLG3'];
  public userSubject: Subject<User>;
  public user: User;

  constructor(public afAuth: AngularFireAuth) {
    this.userSubject = new Subject<User>();
    this._proccessAuthState(null);
    this.afAuth.authState.subscribe((x) => this._proccessAuthState(x) );
  }

  login(provider: string): Observable<string> {
    const fbProvider = this._getProvider(provider);
    if (fbProvider !== null) {
      return Observable.fromPromise(
        <Promise<any>> this.afAuth.auth.signInWithPopup(fbProvider))
      .map((x) => { return null; })
      .catch((x: firebase.auth.Error) => {
        return Observable.of(x.message);
      });
    } else {
      return Observable.of('No provider');
    }
  }

  logout() {
     this.afAuth.auth.signOut();
  }

  private _getProvider(provider: string): firebase.auth.AuthProvider {
    switch (provider) {
      case 'github': return new firebase.auth.GithubAuthProvider();
      case 'google': return new firebase.auth.GoogleAuthProvider();
      case 'twitter': return new firebase.auth.TwitterAuthProvider();
      default: return null;
    }
  }

  private _proccessAuthState(authState: any): void {
    if (authState !== null && authState.providerData != null && authState.providerData.length > 0) {
      const providerData = authState.providerData[0];
      this.user = {
        isLogged: true,
        isAdmin: this._adminIds.indexOf(authState.uid) >= 0,
        name: providerData.displayName,
        image: providerData.photoURL
      };
    } else {
      this.user = { isLogged: false, isAdmin: false, name: null, image: null };
    }
    this.userSubject.next(this.user);
  }

}
