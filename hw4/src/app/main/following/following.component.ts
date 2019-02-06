import {Component, Input, OnInit} from '@angular/core';
import {FollowingService} from './following.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {


  followers;

  constructor(private fServ: FollowingService) { }

  ngOnInit() {
    this.fServ.getFollowers().subscribe(data => this.followers = data);
  }

  addFollower() {
    if ((<HTMLInputElement>document.getElementById('addUserName')).value !== '') {
      this.followers.push({
        'name': 'Jenny Hess',
        'avatar': '../../../../images/jenny.jpg',
        'headline': 'Jenny is a student studying Media Management at the New School'
      });
    }
  }

  unFollow(name) {
    this.followers = this.followers.filter(it => it.name !== name);
  }
}
