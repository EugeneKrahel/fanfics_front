import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  newUserForm: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {
    this.createForm();
  }

  get _email(): AbstractControl {
    return this.newUserForm.get('email');
  }

  get _password(): AbstractControl {
    return this.newUserForm.get('password');
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authenticationService.login(this.newUserForm.value.email, this.newUserForm.value.password)
      .subscribe(data => {
        console.log(data);
      });
  }

  private createForm(): void {
    this.newUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
      password: ['', [Validators.required, Validators.maxLength(256)]],
    });
  }
}
