import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {UsersService} from '../services/users.service';
import {User} from '../models/user';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  isDarkTheme: boolean;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isAuthorized()) {
      this.usersService.getUserById(this.authenticationService.getDecodedUser().sub).subscribe(data => {
        console.log(data.unicornDarkTheme);
        this.currentUser = data;
        this.isDarkTheme = data.unicornDarkTheme;
      });
    }
  }

  toggleDarkTheme(checked: boolean): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.currentUser.unicornDarkTheme = this.isDarkTheme;
    this.usersService.update(this.currentUser).subscribe(
      userData => {
        console.log('success! dark theme is ', userData.unicornDarkTheme);
        location.reload();
      }
    );
  }

  isAuthorized(): boolean {
    return this.authenticationService.isAuthorized();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
