import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FanficsService} from '../services/fanfics.service';
import {ChaptersService} from '../services/chapters.service';
import {switchMap} from 'rxjs/operators';
import {Chapter} from '../models/chapter';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.scss']
})
export class EditChapterComponent implements OnInit {
  newChapterForm: FormGroup;
  edit = true;
  editToRead = 'Read';
  chapterId: number;
  chapter: Chapter;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private fanficsService: FanficsService,
              private chaptersService: ChaptersService) {
    this.createForm();
  }

  get _title(): AbstractControl {
    return this.newChapterForm.get('title');
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))).subscribe(
      data => {
        console.log(data);
        this.chapterId = +data;
      });
    this.chaptersService.searchID(this.chapterId).subscribe(
      data => {
        console.log(data);
        this.chapter = data;
        this.newChapterForm.value.title = data.title;
        this.newChapterForm.value.content = data.content;
      }
    );
  }

  changeEditToRead(): void {
    if (this.edit) {
      this.edit = false;
      this.editToRead = 'Edit';
    } else if (!this.edit) {
      this.edit = true;
      this.editToRead = 'Read';
    }
  }

  save(): void {
    const chapter: Chapter = new Chapter();
    chapter.title = this.newChapterForm.value.title;
    chapter.content = this.newChapterForm.value.content;
    chapter.id = this.chapterId;
    this.chaptersService.update(chapter).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  private createForm(): void {
    this.newChapterForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(256)]],
        content: ['', [Validators.required]]
      }
    );
  }
}
