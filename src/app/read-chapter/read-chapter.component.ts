import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChaptersService} from '../services/chapters.service';
import {switchMap} from 'rxjs/operators';
import {Chapter} from '../models/chapter';

@Component({
  selector: 'app-read-chapter',
  templateUrl: './read-chapter.component.html',
  styleUrls: ['./read-chapter.component.scss']
})
export class ReadChapterComponent implements OnInit {

  chapId: number;
  chapter: Chapter;

  constructor(private route: ActivatedRoute,
              private chaptersService: ChaptersService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))).subscribe(
      data => {
        this.chapId = +data;
      });
    this.chaptersService.searchID(this.chapId).subscribe(data => {
      console.log(data);
      this.chapter = data;
    });
  }

}
