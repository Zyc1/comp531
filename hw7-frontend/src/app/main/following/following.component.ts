import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FollowingService} from './following.service';
import {HttpClient} from '@angular/common/http';

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

  constructor(private http: HttpClient, private fServ: FollowingService) { }


  ngOnInit() {
    this.fServ.getFollowers().subscribe(data => {
      this.followers = data['profiles'];
    });
  }


  addFollower() {
    document.getElementById('Msg').style.display = 'none';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('alertMsg').style.display = 'none';
    if (this.newFollower === localStorage.getItem('username')) {
        document.getElementById('Msg').style.display = 'block';
    } else {
        this.fServ.getFollowingList().subscribe(res => {
            // console.log(res['following']);
            const filteredList = res['following'].filter(el => el === this.newFollower);
            if (filteredList.length > 0) {
                document.getElementById('alertMsg').style.display = 'block';
            } else {
                this.http.put('https://hw7server.herokuapp.com/following/' + this.newFollower, {}, {withCredentials: true})
                    .subscribe(
                        result => {
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
            }
        });
    }
  }


  unFollow(name) {
    this.http.delete('https://hw7server.herokuapp.com/following/' + name, {withCredentials: true})
        .subscribe(res => {
          this.fServ.getFollowers().subscribe(data => {
            this.followers = data['profiles'];
          });
          // console.log(this.followers);
        });
    // this.followers = this.followers.filter(it => it.name !== name);
    this.change.emit(JSON.stringify({'username': name, 'status': 0}));
  }
}
