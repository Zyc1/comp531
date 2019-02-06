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

  newStatus: string;
  loginUser;

  constructor(private http: HttpClient, private pServ: ProfileService) {
  }

  ngOnInit() {
    this.pServ.getProfile().subscribe(data => {
      this.loginUser = data['profile'];
    });
  }

  updateStatus() {
    this.http.put('https://hw7server.herokuapp.com/headline', {headline: this.newStatus}, {withCredentials: true})
        .subscribe(err => {
          console.log(err);
        });
    document.getElementById('headline').innerHTML = this.newStatus;
    this.newStatus = '';
  }
}
