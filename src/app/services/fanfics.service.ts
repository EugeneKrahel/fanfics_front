import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Fanfic} from '../models/fanfic';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class FanficsService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Fanfic[]> {
    return this.http.get<Fanfic[]>(`${environment.backEndUrl}fanfics`);
  }

  save(fanfic: Fanfic): Observable<Fanfic> {
    return this.http.post<Fanfic>(`${environment.backEndUrl}fanfics`, fanfic, this.httpOptions);
  }

  search(AuthorID: number): Observable<Fanfic[]> {
    return this.http.get<Fanfic[]>(`${environment.backEndUrl}fanfics/search/author?id=${AuthorID}`);
  }

  searchID(id: number): Observable<Fanfic> {
    return this.http.get<Fanfic>(`${environment.backEndUrl}fanfics/search/id?id=${id}`);
  }

  delete(fanfic: Fanfic): Observable<void> {
    return this.http.delete<void>(`${environment.backEndUrl}fanfics?id=${fanfic.id}`);
  }
}
