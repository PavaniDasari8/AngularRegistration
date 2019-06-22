import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from 'app/services/user/user.service';
import { User } from 'app/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationFormGroup: FormGroup;
  user = new User();

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.registrationFormGroup = this.formBuilder.group({
      userName: [this.user.userName, Validators.required],
      email: [this.user.email, Validators.required],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      dateOfBirth: [this.user.dateOfBirth],
      password: [this.user.password, Validators.required],
      skills: [this.user.skills],
      country: [this.user.country]
    });
  }

  get f() { return this.registrationFormGroup.controls; }

  onSubmit() {
    // this.submitted = true;
    // stop here if form is invalid
    console.log(this.registrationFormGroup.invalid, 'validation');
    // if (this.registrationFormGroup.invalid) {
    //   return;
    // }
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
      console.log(res.body);
    });

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationFormGroup.value));
  }

}
