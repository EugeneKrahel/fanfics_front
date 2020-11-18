import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Chapter} from '../models/chapter';
import {Fanfic} from '../models/fanfic';

@Injectable({providedIn: 'root'})
export class ChaptersService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>('http://localhost:3000/chapters');
  }

  save(chapter: Chapter): Observable<Chapter> {
    return this.http.post<Chapter>('http://localhost:3000/chapters', chapter, this.httpOptions);
  }

  searchByFanfic(fanficId: number): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`http://localhost:3000/chapters/search/fanfic?id=${fanficId}`);
  }

  searchID(id: number): Observable<Chapter> {
    return this.http.get<Chapter>(`http://localhost:3000/chapters/search/id?id=${id}`);
  }

  delete(chapter: Chapter): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/chapters?id=${chapter.id}`);
  }
}
