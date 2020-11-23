import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {UsersService} from './services/users.service';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  darkTheme: boolean;

  constructor(private authenticationService: AuthenticationService,
              private usersService: UsersService,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isAuthorized()) {
      this.usersService.getUserById(this.authenticationService.getDecodedUser().sub).subscribe(data => {
        this.darkTheme = data.unicornDarkTheme;
        this.themeService.getTheme(data.unicornDarkTheme);
      });
    }
  }
}
