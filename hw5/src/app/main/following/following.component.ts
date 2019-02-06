import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FollowingService} from './following.service';
import {ProfileService} from '../../profile/profile.service';
import {PostsService} from '../posts/posts.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  newFollower;
  followers;
  users;

  @Output() change = new EventEmitter();

  constructor(private fServ: FollowingService, private pServ: ProfileService) { }


  ngOnInit() {
    this.fServ.getFollowers().subscribe(data => {
      this.followers = data;
      this.followers = this.followers.filter(it => it.belonging === localStorage.getItem('username'));
    });
  }

  addFollower() {
    document.getElementById('Msg').style.display = 'none';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('alertMsg').style.display = 'none';
    this.pServ.getProfile().subscribe(data => {
      this.users = data;
      if (this.newFollower === localStorage.getItem('username')) {
        document.getElementById('Msg').style.display = 'block';
        return false;
      }
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].name === this.newFollower) {
          this.followers.push(this.users[i]);
          console.log('following:' + this.followers);
          this.change.emit(JSON.stringify({'username': this.users[i].name, 'status': 1}));
          return true;
        }
      }
      document.getElementById('errorMsg').style.display = 'block';
    });
  }

  unFollow(name) {
    this.followers = this.followers.filter(it => it.name !== name);
    this.change.emit(JSON.stringify({'username': name, 'status': 0}));
  }
}
