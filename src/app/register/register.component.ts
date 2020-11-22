import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchValidator} from '../validators/password.validator';
import {User} from '../models/user';
import {UsersService} from '../services/users.service';
import {Role} from '../models/enums/role.enum';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  newUserForm: FormGroup;

  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              public dialog: MatDialog) {
    this.createForm();
  }

  get _name(): AbstractControl {
    return this.newUserForm.get('name');
  }

  get _email(): AbstractControl {
    return this.newUserForm.get('email');
  }

  get _password(): AbstractControl {
    return this.newUserForm.get('password');
  }

  get _confirmPassword(): AbstractControl {
    return this.newUserForm.get('confirmPassword');
  }

  ngOnInit(): void {
  }

  register(): void {
    const user: User = new User();
    user.username = this.newUserForm.value.name;
    user.email = this.newUserForm.value.email;
    user.password = this.newUserForm.value.password;
    user.role = Role.USER;
    this.usersService.save(user).subscribe(
      data => {
        console.log(data);
      },
      (err) => console.log(err)
    );
    this.dialog.open(DialogComponent);
  }

  private createForm(): void {
    this.newUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(256)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
      password: ['', [Validators.required, Validators.maxLength(256)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(256)]]
    }, {
      validator: matchValidator('password', 'confirmPassword')
    });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
})
export class DialogComponent{
}
