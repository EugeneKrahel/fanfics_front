import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Chapter} from '../models/chapter';
import {Fanfic} from '../models/fanfic';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ChaptersService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${environment.backEndUrl}chapters`);
  }

  save(chapter: Chapter): Observable<Chapter> {
    return this.http.post<Chapter>(`${environment.backEndUrl}chapters`, chapter, this.httpOptions);
  }

  searchByFanfic(fanficId: number): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${environment.backEndUrl}chapters/search/fanfic?id=${fanficId}`);
  }

  searchID(id: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${environment.backEndUrl}chapters/search/id?id=${id}`);
  }

  delete(chapter: Chapter): Observable<void> {
    return this.http.delete<void>(`${environment.backEndUrl}chapters?id=${chapter.id}`);
  }
}
