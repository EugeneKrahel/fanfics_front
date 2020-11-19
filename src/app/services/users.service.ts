import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Fanfic} from '../models/fanfic';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.backEndUrl}users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.backEndUrl}users/search/id?id=${id}`);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${environment.backEndUrl}users`, user, this.httpOptions);
  }

  delete(user: User): Observable<void> {
    return this.http.delete<void>(`${environment.backEndUrl}users?username=${user.username}`);
  }
}
