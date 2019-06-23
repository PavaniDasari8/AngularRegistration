import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    if (!this.user) {
      this.router.navigateByUrl('/login');
    }
  }

  logoutUser(temp) {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
