import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../services/users.service';
import {User} from '../models/user';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  email: string;
  key: string;
  user: User;
  message: string;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        console.log(params);
        this.email = params.email;
        this.usersService.getUserByEmail(this.email).subscribe(user => {
          this.user = user;
          this.route.queryParams.subscribe(data => {
            console.log(data);
            console.log(data.token);
            if (data && data.token === this.user.key) {
              this.user.key = null;
              this.usersService.update(this.user).subscribe(
                userData => {
                  console.log(userData);
                }
              );
              this.message = 'successfully!';
            } else {
              this.message = 'failed.';
            }
          });
        });
      }
    );
  }

}
