import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: any;
  @Input() name: any;
  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  logoutEvent() {
    this.logout.emit(null);
  }

}
