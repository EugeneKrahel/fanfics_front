import {Component, OnInit} from '@angular/core';
import {Chapter} from '../models/chapter';
import {ActivatedRoute} from '@angular/router';
import {ChaptersService} from '../services/chapters.service';
import {switchMap} from 'rxjs/operators';
import {FanficsService} from '../services/fanfics.service';
import {Fanfic} from '../models/fanfic';

@Component({
  selector: 'app-read-fanfic',
  templateUrl: './read-fanfic.component.html',
  styleUrls: ['./read-fanfic.component.scss']
})
export class ReadFanficComponent implements OnInit {

  fanficId: number;
  allChapters: Chapter[];
  currentChapter: Chapter;
  panelOpenState = true;
  fanfic: Fanfic;

  constructor(private route: ActivatedRoute,
              private chaptersService: ChaptersService,
              private fanficsService: FanficsService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))).subscribe(
      data => {
        this.fanficId = +data;
      });
    this.chaptersService.searchByFanfic(this.fanficId).subscribe(data => {
      this.allChapters = data;
      this.allChapters.sort((a, b) => a.id > b.id ? 1 : -1);
      console.log(this.allChapters);
      this.currentChapter = this.allChapters[0];
    });
    this.fanficsService.searchID(this.fanficId).subscribe(data => {
      this.fanfic = data;
      console.log(this.fanfic);
    });
  }

  viewChapter(chapter: Chapter): void {
    this.currentChapter = chapter;
    this.panelOpenState = false;
  }
}
