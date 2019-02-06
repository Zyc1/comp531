import { Component, OnInit } from '@angular/core';
import {HeadlineService} from './headline.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  users;
  newStatus: string;
  loginUser;
  headline: string;

  constructor(private uServ: HeadlineService) {
  }

  ngOnInit() {
    this.uServ.getUserInfo().subscribe(data => {
      this.users = data;
      this.loginUser = this.users.filter(it => it.name === localStorage.getItem('username'));
      // localStorage.setItem('headline', this.loginUser[0].headline);
      this.headline = localStorage.getItem('headline');
    });
  }

  updateStatus() {
    console.log(this.newStatus);
    localStorage.setItem('headline', this.newStatus);
    this.headline = localStorage.getItem('headline');
  }
}
