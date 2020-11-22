import {Genre} from './enums/genre.enum';

export class Fanfic {
  id: number;
  title: string;
  genre: Genre;
  chapters: string[];
  tags: string[];
}
