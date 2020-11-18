import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApplicationUser} from '../models/application.user';
import jwt_decode from 'jwt-decode';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<ApplicationUser>;
  private currentUserSubject: BehaviorSubject<ApplicationUser>;

  constructor(private readonly http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<ApplicationUser> {
    return this.http.post<any>(`${environment.backEndUrl}login`, {username: email, password}).pipe(
      map(user => {
        if (user && user.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthorized(): boolean {
    const currentUser = this.currentUserValue;
    return !!(currentUser && currentUser.accessToken);
  }

  getDecodedUser(): any | undefined {
    if (this.currentUser) {
      const jwtDecode = jwt_decode(this.currentUserValue.accessToken);
      if (typeof jwtDecode === 'object') {
        return jwtDecode as any;
      }
    }
    return undefined;
  }
}
