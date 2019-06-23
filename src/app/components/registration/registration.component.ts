import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from 'app/services/user/user.service';
import { User } from 'app/models';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
declare var google;
import { countryList } from 'app/models/country';

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
  countrylist = countryList;
  constructor(private userService: UserService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader) {
    this.getCurrentCountry();
  }

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
            alert('Successfully Registered!! ' + res.response.userName);
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

  async getCurrentCountry() {
    return await new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          this.mapsAPILoader.load().then(() => {
            const geocoder = new google.maps.Geocoder();
            const latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            geocoder.geocode({ 'location': latlng }, (results, status) => {
              if (status === google.maps.GeocoderStatus.OK) {
                const address_components = results[0].address_components;
                const address = address_components.filter(r => {
                  if (r.types[0] === 'country') {
                    this.user.country = r.long_name;
                    return r;
                  }
                }).map(r => {
                  return r.short_name;
                })
                resolve(address[0]);
              }
            });
          });

        });
      } else {
        return 'SA';
      }
    })
  }
}