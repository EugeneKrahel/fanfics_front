import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Comment} from '../models/comment';
import {Fanfic} from '../models/fanfic';
import {CommentWithUser} from '../models/commentWithUser';

@Injectable({providedIn: 'root'})
export class CommentsService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  searchByFanfic(fanficId: number): Observable<CommentWithUser[]> {
    return this.http.get<CommentWithUser[]>(`${environment.backEndUrl}comments/search/fanfic?id=${fanficId}`);
  }

  save(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${environment.backEndUrl}comments`, comment, this.httpOptions);
  }

  delete(comment: CommentWithUser): Observable<void> {
    return this.http.delete<void>(`${environment.backEndUrl}comments?id=${comment.id}`);
  }
}
