import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  token = this.authenticationService.currentUserValue.accessToken;
  decoded: any;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    const jwtDecode = jwt_decode(this.token);
    if (typeof jwtDecode === 'object') {
      this.decoded = jwtDecode as any;
    }
  }

  isAuthorized(): boolean {
    return this.authenticationService.isAuthorized();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
