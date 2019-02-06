import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FollowingService} from './following.service';
import {ProfileService} from '../../profile/profile.service';
import {PostsService} from '../posts/posts.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  newFollower;
  followers;
  // followersList;
  users;

  @Output() change = new EventEmitter();

  constructor(private http: HttpClient, private fServ: FollowingService, private pServ: ProfileService) { }


  ngOnInit() {
    this.fServ.getFollowers().subscribe(data => {
      this.followers = data['profiles'];
      // this.showFollowers();
      // this.showFollowers();
      // this.http.get('http://127.0.0.1:3000/profile/'+)
    });
    /*this.fServ.getFollowers().subscribe(data => {
      this.followers = data;
      this.followers = this.followers.filter(it => it.belonging === localStorage.getItem('username'));
    });*/
  }

  /*showFollowers() {
      this.followersList.forEach(follower => {
          this.http.get('http://127.0.0.1:3000/profile/' + follower, {withCredentials: true})
              .subscribe(res => {
                  this.followers.push(res['profile'][0]);
                  console.log(this.followers);
              });
      });
  }*/


  addFollower() {
    document.getElementById('Msg').style.display = 'none';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('alertMsg').style.display = 'none';
    this.http.put('https://hw6server.herokuapp.com/following/' + this.newFollower, {}, {withCredentials: true})
        .subscribe(
            res => {
          this.fServ.getFollowers().subscribe(data => {
            this.followers = data['profiles'];
              this.change.emit(JSON.stringify({'username': this.newFollower, 'status': 1}));
              return true;
          });
        },
            err => {
                document.getElementById('errorMsg').style.display = 'block';
            }
        );
    /*this.pServ.getProfile().subscribe(data => {
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
    });*/
  }


  unFollow(name) {
    this.http.delete('https://hw6server.herokuapp.com/following/' + name, {withCredentials: true})
        .subscribe(res => {
          this.fServ.getFollowers().subscribe(data => {
            this.followers = data['profiles'];
          });
          console.log(this.followers);
        });
    // this.followers = this.followers.filter(it => it.name !== name);
    this.change.emit(JSON.stringify({'username': name, 'status': 0}));
  }
}
