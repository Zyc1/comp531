import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile;

  constructor(private pServ: ProfileService) { }

  ngOnInit() {
    /*this.pServ.getProfile().subscribe(data => {
      this.profile = data;
      this.profile = this.profile.filter(it => it.name === localStorage.getItem('username'));
      console.log(this.profile);
    });*/
    this.getUserInfo();
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
      }
      if (newTel !== '') {
        document.getElementById('initialTel').innerHTML = newTel;
      }
      if (newZip !== '') {
        document.getElementById('initialZip').innerHTML = newZip;
      }
    }
  }
}
