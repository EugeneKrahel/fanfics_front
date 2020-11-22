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
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('email'))).subscribe(
      email => {
        this.email = email;
        this.usersService.getUserByEmail(email).subscribe(user => {
          this.user = user;
          this.route.paramMap.pipe(
            switchMap(params => params.getAll('confirmKey'))).subscribe(
            key => {
              if (key && key === this.user.key) {
                this.user.key = null;
                this.usersService.update(this.user).subscribe(
                  data => {
                    console.log(data);
                  }
                );
                this.message = 'successfully!';
              } else {
                this.message = 'failed.';
              }
            });
        });

      });
  }

}
