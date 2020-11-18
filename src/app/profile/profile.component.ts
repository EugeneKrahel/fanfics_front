import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Fanfic} from '../models/fanfic';
import {UsersService} from '../services/users.service';
import {ActivatedRoute} from '@angular/router';
import jwt_decode from 'jwt-decode';
import {AuthenticationService} from '../services/authentication.service';
import {FanficsService} from '../services/fanfics.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['name', 'genre', 'ReadEditDelete'];
  dataSource: MatTableDataSource<Fanfic>;
  @ViewChild(MatSort) sort: MatSort;
  token = this.authenticationService.currentUserValue.accessToken;
  decoded: any;
  userFanfics: Fanfic[];

  id: number;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private fanficsService: FanficsService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))).subscribe(data => this.id = +data);

    const jwtDecode = jwt_decode(this.token);
    if (typeof jwtDecode === 'object') {
      this.decoded = jwtDecode as any;
    }
    this.search();
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
    return this.id === this.decoded.sub;
  }
}
