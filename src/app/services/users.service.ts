import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Fanfic} from '../models/fanfic';

@Injectable({providedIn: 'root'})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/search?id=${id}`);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user, this.httpOptions);
  }

  delete(user: User): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/users?username=${user.username}`);
  }
}
