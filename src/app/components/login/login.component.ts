import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from 'app/services/user/user.service';
import { User } from 'app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl(this.user.userName, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
    });
  }

  validateForm = () => {
    this.loginForm.setValue({
      userName: this.user.userName,
      password: this.user.password
    });
    if (this.loginForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.validateForm) {
      const payload = new User({
        userName: this.user.userName,
        password: this.user.password
      });
      this.userService.logIn(payload).subscribe((res) => {
        if (res) {
          if (res.status === 200) {
            localStorage.setItem('userInfo', JSON.stringify(res.response));
            this.router.navigateByUrl('/profile');
          }
          if (res.status === 401) {
            alert(res.message);
          }
        }
      });
    }
  }

}
