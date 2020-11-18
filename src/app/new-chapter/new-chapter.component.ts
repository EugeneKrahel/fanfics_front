import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChaptersService} from '../services/chapters.service';
import {Chapter} from '../models/chapter';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {FanficsService} from '../services/fanfics.service';

@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.scss']
})
export class NewChapterComponent implements OnInit {

  newChapterForm: FormGroup;
  edit = true;
  editToRead = 'Read';
  fanficID: number;

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
          this.fanficID = +data;
        });
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
    chapter.fanficId = this.fanficID;
    this.chaptersService.save(chapter).subscribe(
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
