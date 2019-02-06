import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = [{}];
  name: string;
  email: string;
  tel: string;
  birthday: string;
  zipcode: string;
  avatar: File;

  constructor(private http: HttpClient, private pServ: ProfileService, private router: Router) { }

  ngOnInit() {
      this.pServ.getProfile().subscribe(res => {
        this.profile = res['profile'];
        });
  }

  uploadAvatar(event) {
    if (event.target.files && event.target.files[0]) {
      this.avatar = <File>event.target.files[0];
      const data = new FormData();
      data.append('image', this.avatar, this.avatar.name);
      this.pServ.uploadAvatar(data).subscribe(res => {
        if (res['img']) {
          this.pServ.updateAvatar(res['img']).subscribe(re => {
              this.pServ.getProfile().subscribe(profile => {
                  this.profile = profile['profile'];
              });
          });
        }
      });
    }
  }

  onSubmit() {
    let valid = true;
    document.getElementById('checkAccount').style.display = 'none';
    document.getElementById('checkEmail').style.display = 'none';
    document.getElementById('checkTel').style.display = 'none';
    document.getElementById('checkZip').style.display = 'none';
    if (!(<HTMLInputElement>document.getElementById('accountName')).checkValidity()) {
      document.getElementById('checkAccount').style.display = 'block';
      valid = false;
    }
    if (!(<HTMLInputElement>document.getElementById('email')).checkValidity()) {
      document.getElementById('checkEmail').style.display = 'block';
      valid = false;
    }
    if (!(<HTMLInputElement>document.getElementById('phone')).checkValidity()) {
      document.getElementById('checkTel').style.display = 'block';
      valid = false;
    }
    if (!(<HTMLInputElement>document.getElementById('zipcode')).checkValidity()) {
      document.getElementById('checkZip').style.display = 'block';
      valid = false;
    }

    if (valid) {
      const newName = (<HTMLInputElement>document.getElementById('accountName')).value;
      const newEmail = (<HTMLInputElement>document.getElementById('email')).value;
      const newTel = (<HTMLInputElement>document.getElementById('phone')).value;
      const newZip = (<HTMLInputElement>document.getElementById('zipcode')).value;
      const newPassword = (<HTMLInputElement>document.getElementById('password')).value;
      if (newName !== '') {
        document.getElementById('initialName').innerHTML = newName;
      }
      if (newEmail !== '') {
        document.getElementById('initialEmail').innerHTML = newEmail;
        this.http.put('https://hw7server.herokuapp.com/email', {email: newEmail}, {withCredentials: true})
            .subscribe(err => {
              console.log(err);
            });
      }
      if (newTel !== '') {
        document.getElementById('initialTel').innerHTML = newTel;
          this.http.put('https://hw7server.herokuapp.com/tel', {tel: newTel}, {withCredentials: true})
              .subscribe(err => {
                  console.log(err);
              });
      }
      if (newZip !== '') {
        document.getElementById('initialZip').innerHTML = newZip;
          this.http.put('https://hw7server.herokuapp.com/zipcode', {zipcode: newZip}, {withCredentials: true})
              .subscribe(err => {
                  console.log(err);
              });
      }
      if (newPassword !== '') {
          this.http.put('https://hw7server.herokuapp.com/password', {password: newPassword}, {withCredentials: true})
              .subscribe(err => {
                console.log(err);
              });
        }
    }
  }

  link() {
    const username = (<HTMLInputElement>document.getElementById('normalUsername')).value;
    const password = (<HTMLInputElement>document.getElementById('normalPassword')).value;
    if (localStorage.getItem('username')) {
      $('#loginwithApp').modal('show');
      return;
    }
    this.http.put('https://hw7server.herokuapp.com/link', {username: username, password: password}, {withCredentials: true})
        .subscribe(res => {
          if (res['result'] === 'success') {
              // this.router.navigate(['auth']);
              $('#relogin').modal('show');
          } else {
            console.log(res);
          }
        });
  }

  redirect() {
      this.router.navigate(['auth']);
  }

  unlink() {
    this.http.get('https://hw7server.herokuapp.com/unlink', {withCredentials: true}).subscribe(res => {
      if (res['result'] === 'success') {
        $('#message').modal('show');
      }
    });
  }
}
