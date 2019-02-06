import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import {HttpClient} from '@angular/common/http';

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

  constructor(private http: HttpClient, private pServ: ProfileService) { }

  ngOnInit() {
    /*this.pServ.getProfile().subscribe(data => {
      this.profile = data;
      this.profile = this.profile.filter(it => it.name === localStorage.getItem('username'));
      console.log(this.profile);
    });*/
    // this.getUserInfo();
      // this.http.get('http://127.0.0.1:3000/profile', {withCredentials: true}).subscribe(res => {
      this.pServ.getProfile().subscribe(res => {
        this.profile = res['profile'];
          console.log(this.profile);
        });
  }

  getUserInfo(): Promise<any> {
    return fetch('../../../assets/profile.json')
      .then(res => res.json())
      .then(res => {
        // this.profile = res;
        for (let i = 0; i < Object.values(res).length; i++) {
          if (Object.values(res)[i]['name'] === localStorage.getItem('username')) {
            // console.log(Object.values(res)[i]);
            this.profile = new Array(Object.values(res)[i]);
            return Object.values(res)[i];
          }
        }
        /*this.profile = this.profile.filter(it => it.name === localStorage.getItem('username'));
        console.log('ffffff' + this.profile);
        return this.profile;*/
      });
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
      if (newName !== '') {
        document.getElementById('initialName').innerHTML = newName;
      }
      if (newEmail !== '') {
        document.getElementById('initialEmail').innerHTML = newEmail;
        this.http.put('https://hw6server.herokuapp.com/email', {email: newEmail}, {withCredentials: true})
            .subscribe(err => {
              console.log(err);
            });
      }
      if (newTel !== '') {
        document.getElementById('initialTel').innerHTML = newTel;
          this.http.put('https://hw6server.herokuapp.com/tel', {tel: newTel}, {withCredentials: true})
              .subscribe(err => {
                  console.log(err);
              });
      }
      if (newZip !== '') {
        document.getElementById('initialZip').innerHTML = newZip;
          this.http.put('https://hw6server.herokuapp.com/zipcode', {zipcode: newZip}, {withCredentials: true})
              .subscribe(err => {
                  console.log(err);
              });
      }
    }
  }
}
