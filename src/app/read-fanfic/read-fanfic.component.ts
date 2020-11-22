import {Component, OnInit} from '@angular/core';
import {Chapter} from '../models/chapter';
import {ActivatedRoute} from '@angular/router';
import {ChaptersService} from '../services/chapters.service';
import {switchMap} from 'rxjs/operators';
import {FanficsService} from '../services/fanfics.service';
import {Fanfic} from '../models/fanfic';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-read-fanfic',
  templateUrl: './read-fanfic.component.html',
  styleUrls: ['./read-fanfic.component.scss']
})
export class ReadFanficComponent implements OnInit {

  fanficId: number;
  allChapters: Chapter[];
  currentChapter: Chapter;
  contentsOpenState = true;
  commentsOpenState = false;
  fanfic: Fanfic;
  newCommentForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private chaptersService: ChaptersService,
              private fanficsService: FanficsService,
              private fb: FormBuilder) {
    this.createForm();
  }

  get _comment(): AbstractControl {
    return this.newCommentForm.get('comment');
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
    this.contentsOpenState = false;
  }

  private createForm(): void {
    this.newCommentForm = this.fb.group({
        comment: ['', [Validators.required, Validators.maxLength(512)]]
      }
    );
  }
}
