import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../services/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {Fanfic} from '../models/fanfic';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {FanficsService} from '../services/fanfics.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  displayedColumns: string[] = ['username', 'name', 'genre', 'ReadEditDelete'];
  dataSource: MatTableDataSource<Fanfic>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userFanfics: Fanfic[];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
    private fanficsService: FanficsService) {
  }

  ngOnInit(): void {
    this.search();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(fanfic: Fanfic): void {
    this.fanficsService.delete(fanfic).subscribe(data => {
      console.log(data);
    });
    this.search();
  }

  search(): void {
    this.fanficsService.getAll().subscribe(
      data => {
        console.log(data);
        this.userFanfics = data;
        this.dataSource = new MatTableDataSource(this.userFanfics);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

}
