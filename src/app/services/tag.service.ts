import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tag} from '../models/tag';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TagsService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  findAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.backEndUrl}tags`);
  }

  search(namePattern: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.backEndUrl}tags/search?name=${namePattern}`);
  }

  save(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${environment.backEndUrl}tags`, tag, this.httpOptions);
  }
}
