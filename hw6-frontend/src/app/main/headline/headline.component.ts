import { Component, OnInit } from '@angular/core';
import {HeadlineService} from './headline.service';
import {ProfileService} from '../../profile/profile.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  // users;
  newStatus: string;
  loginUser;
  // headline: string;

  constructor(private http: HttpClient, private pServ: ProfileService) {
  }

  ngOnInit() {
    this.pServ.getProfile().subscribe(data => {
      this.loginUser = data['profile'];
    });
    /*this.uServ.getUserInfo().subscribe(data => {
      this.users = data;
      this.loginUser = this.users.filter(it => it.name === localStorage.getItem('username'));
      // localStorage.setItem('headline', this.loginUser[0].headline);
      this.headline = localStorage.getItem('headline');
    });*/
  }

  updateStatus() {
    this.http.put('https://hw6server.herokuapp.com/headline', {headline: this.newStatus}, {withCredentials: true})
        .subscribe(err => {
          console.log(err);
        });
    document.getElementById('headline').innerHTML = this.newStatus;
    this.newStatus = '';
    // console.log(this.newStatus);
    // localStorage.setItem('headline', this.newStatus);
    // this.headline = localStorage.getItem('headline');
  }
}
