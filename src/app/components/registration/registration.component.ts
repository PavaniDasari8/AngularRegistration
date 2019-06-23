import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from 'app/services/user/user.service';
import { User } from 'app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  user = new User();
  validName = '';
  validEmail = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      userName: new FormControl(this.user.userName, [Validators.required]),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName),
      dateOfBirth: new FormControl(this.user.dateOfBirth),
      password: new FormControl(this.user.password, Validators.required),
      skills: new FormControl(this.user.skills),
      country: new FormControl(this.user.country)
    });
  }

  async validname(name) {
    const res = await this.userService.userNameValidation(name).toPromise();
    if (res.status == 200)
      this.validName = 'valid';
    else
      this.validName = 'invalid';
  }

  async validemail(email, valid) {
    if (valid) {
      const res = await this.userService.emailValidation(email).toPromise();
      if (res.status == 200)
        this.validEmail = 'valid';
      else
        this.validEmail = 'invalid';
    }
  }

  validateForm = () => {
    this.registrationForm.setValue({
      userName: this.user.userName,
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      dateOfBirth: this.user.dateOfBirth,
      password: this.user.password,
      skills: this.user.skills,
      country: this.user.country
    });
    if (this.registrationForm.valid && this.validName === 'valid' && this.validEmail === 'valid') {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.validateForm) {
      const payload = new User({
        userName: this.user.userName,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        dateOfBirth: this.user.dateOfBirth,
        password: this.user.password,
        skills: this.user.skills,
        country: this.user.country
      });
      this.userService.signUp(payload).subscribe((res) => {
        if (res) {
          if (res.status === 200) {
            alert('Successfully Registered!! :-)\n\n' + res.response.userName);
            localStorage.setItem('userInfo', JSON.stringify(res.response));
            this.router.navigateByUrl('/profile');
          }
          if (res.status === 401) {
            alert('Please try with valid data!! :-)\n\n');
          }
        }
      });
    }
  }

}
