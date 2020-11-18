import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Tag} from '../models/tag';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {TagsService} from '../services/tag.service';
import {Genre} from '../models/enums/genre.enum';
import {Fanfic} from '../models/fanfic';
import {FanficsService} from '../services/fanfics.service';

@Component({
  selector: 'app-create-fanfic',
  templateUrl: './create-fanfic.component.html',
  styleUrls: ['./create-fanfic.component.scss']
})
export class CreateFanficComponent implements OnInit {

  nameValue = '';
  descriptionValue = '';
  newFanficForm: FormGroup;
  genres = [
    Genre.adventure,
    Genre.erotic,
    Genre.fairyTale,
    Genre.fantasy,
    Genre.horror,
    Genre.postApocalypse,
    Genre.roman,
    Genre.thriller,
    Genre.other
  ];
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];
  allTags: string[];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  tag = '';

  constructor(private tagsService: TagsService, private fb: FormBuilder, private fanficsService: FanficsService) {
    this.createForm();
  }

  get _name(): AbstractControl {
    return this.newFanficForm.get('name');
  }

  get _description(): AbstractControl {
    return this.newFanficForm.get('description');
  }

  get _genre(): AbstractControl {
    return this.newFanficForm.get('genre');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (this.tags.map(tag => tag.name).includes(value)) {
      input.value = '';
    } else {
      if ((value || '').trim()) {
        this.tags.push({name: value.trim()});
      }

      if (input) {
        input.value = '';
      }
    }
    console.log(this.tags);
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.map(tag => tag.name).push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
  }

  onTextChange(): void {
    if (this.tag.length > 2) {
      this.tagsService.search(this.tag).subscribe(data => {
        console.log(data);
        this.allTags = data.map(tag => tag.name);
      });
    } else {
      this.allTags = [];
    }
  }

  ngOnInit(): void {
  }

  autoAdd(event: string): void {
    if (!this.tags.map(tag => tag.name).includes(event)) {
      if ((event || '').trim()) {
        this.tags.push({name: event});
      }
    }
  }

  create(): void {
    const fanfic: Fanfic = new Fanfic();
    fanfic.title = this.newFanficForm.value.name;
    fanfic.genre = this.newFanficForm.value.genre;
    fanfic.tags = this.tags.map(tag => tag.name);
    this.fanficsService.save(fanfic).subscribe(
      data => {
        console.log(data);
      });
  }

  private createForm(): void {
    this.newFanficForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(256)]],
        description: ['', [Validators.required, Validators.maxLength(1024)]],
        genre: ['', [Validators.required]]
      }
    );
  }
}
