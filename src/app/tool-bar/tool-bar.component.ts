import {Component} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {

  constructor(private authenticationService: AuthenticationService) {
  }

  isAuthorized(): boolean {
    return this.authenticationService.isAuthorized();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
