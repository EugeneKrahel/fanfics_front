import {Author} from './Author';

export class CommentWithUser {
  id: number;
  author: Author;
  content: string;
  date: Date;
  fanficId: number;
}
