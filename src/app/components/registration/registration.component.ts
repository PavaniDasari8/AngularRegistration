import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      password: [''],
      skills: [''],
      country: ['']
    });
  }

}
