import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Fanfic} from '../models/fanfic';

@Injectable({providedIn: 'root'})
export class FanficsService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Fanfic[]> {
    return this.http.get<Fanfic[]>('http://localhost:3000/fanfics');
  }

  save(fanfic: Fanfic): Observable<Fanfic> {
    return this.http.post<Fanfic>('http://localhost:3000/fanfics', fanfic, this.httpOptions);
  }

  search(AuthorID: number): Observable<Fanfic[]> {
    return this.http.get<Fanfic[]>(`http://localhost:3000/fanfics/search/author?id=${AuthorID}`);
  }

  searchID(id: number): Observable<Fanfic> {
    return this.http.get<Fanfic>(`http://localhost:3000/fanfics/search/id?id=${id}`);
  }

  delete(fanfic: Fanfic): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/fanfics?id=${fanfic.id}`);
  }
}
