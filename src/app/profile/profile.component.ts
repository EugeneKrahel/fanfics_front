import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Fanfic} from '../models/fanfic';
import {UsersService} from '../services/users.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {FanficsService} from '../services/fanfics.service';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['name', 'genre', 'ReadEditDelete'];
  dataSource: MatTableDataSource<Fanfic>;
  @ViewChild(MatSort) sort: MatSort;
  userFanfics: Fanfic[];

  id: number;
  user: User;
  canEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private fanficsService: FanficsService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))).subscribe(data => this.id = +data);

    this.usersService.getUserById(this.id).subscribe(data => {
      this.user = data;
      console.log(data);
    });
    this.search();
    this.isAdmin();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(fanfic: Fanfic): void {
    this.fanficsService.delete(fanfic).subscribe(data => {
      console.log(data);
      this.search();
    });
  }

  search(): void {
    this.fanficsService.search(this.id).subscribe(
      data => {
        console.log(data);
        this.userFanfics = data;
        this.dataSource = new MatTableDataSource(this.userFanfics);
        this.dataSource.sort = this.sort;
      }
    );
  }

  isEditor(): boolean {
    return this.id === this.authenticationService.getDecodedUser().sub;
  }

  isAdmin(): void {
    this.usersService.getUserById(this.authenticationService.getDecodedUser().sub).subscribe(data => {
      if (data.role === 'ADMIN') {
        this.canEdit = true;
      }
    });
  }
}

