import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Fanfic} from '../models/fanfic';
import {FanficsService} from '../services/fanfics.service';
import {ChaptersService} from '../services/chapters.service';
import {Chapter} from '../models/chapter';

@Component({
  selector: 'app-fanfic-editor',
  templateUrl: './fanfic-editor.component.html',
  styleUrls: ['./fanfic-editor.component.scss']
})
export class FanficEditorComponent implements OnInit {
  id: number;
  title: string;
  fanfic: Fanfic;
  chapters: Chapter[];

  constructor(private route: ActivatedRoute,
              private fanficsService: FanficsService,
              private chaptersService: ChaptersService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))).subscribe(data => this.id = +data);

    this.fanficsService.searchID(this.id).subscribe(
      data => {
        this.fanfic = data;
        console.log(this.fanfic);
        this.search();
      }
    );
  }

  delete(chapter: Chapter): void {
    this.chaptersService.delete(chapter).subscribe(data => {
      console.log(data);
      this.search();
    });
  }

  search(): void {
    this.chaptersService.searchByFanfic(this.id).subscribe(data => {
        this.chapters = data;
        this.chapters.sort((a, b) => a.id > b.id ? 1 : -1);
        console.log(this.chapters);
      }
    );
  }
}
