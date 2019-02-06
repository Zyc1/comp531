import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProfileService} from '../../profile/profile.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users;
  loginStatus: string;

  constructor(private router: Router) { }

  ngOnInit() {
    // this.pServ.getProfile().subscribe(data => this.users = data);
  }

  onSubmit() {

    document.getElementById('errMsg').style.display = 'none';
    document.getElementById('successMsg').style.display = 'none';
    document.getElementById('message').style.visibility = 'hidden';
    const childNodes = document.getElementById('msg').childNodes;
    if ( childNodes.length !== 0 ) {
      for (let i = childNodes.length - 1; i >= 0; i--) {
        document.getElementById('msg').removeChild(childNodes[i]);
      }
    }
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    if ((<HTMLInputElement>username).value === '') {
      const li = document.createElement('li');
      li.innerHTML = 'You must enter username';
      document.getElementById('msg').appendChild(li);
      document.getElementById('message').style.visibility = 'visible';
    }
    if ((<HTMLInputElement>password).value === '') {
      const li = document.createElement('li');
      li.innerHTML = 'You must enter password';
      document.getElementById('msg').appendChild(li);
      document.getElementById('message').style.visibility = 'visible';
    }
    if ((<HTMLInputElement>username).checkValidity() === true && (<HTMLInputElement>password).checkValidity() === true) {
      // && this.login((<HTMLIn<HTMLInputElement>username).valueputElement>username).value, (<HTMLInputElement>password).value)) {

      this.login((<HTMLInputElement>username).value, (<HTMLInputElement>password).value).then(res => {
        if (res === true) {
          localStorage.setItem('username', (<HTMLInputElement>username).value);
          localStorage.setItem('password', (<HTMLInputElement>password).value);
          this.router.navigate(['main']);
          document.getElementById('message').style.visibility = 'hidden';
        }
      });
      /*localStorage.setItem('password', (<HTMLInputElement>password).value);
      this.router.navigate(['main']);
      document.getElementById('message').style.visibility = 'hidden';*/
    }
  }

  register() {
    this.router.navigate(['registration']);
  }

  isRegistered(uname: string, password: string): Promise<boolean> {
    return fetch('../../../assets/profile.json')
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < Object.values(res).length; i++) {
          if (uname === Object.values(res)[i]['name'] && password === Object.values(res)[i]['password']) {
            localStorage.setItem('headline', Object.values(res)[i]['headline']);
            localStorage.setItem('avatar', Object.values(res)[i]['avatar']);
            return true;
          }
        }
        // this.showErrMsg();
        return false;
      });
  }


  login(uname: string, password: string): Promise<boolean> {
    // this.isRegistered(uname, password) ? this.showSuccessMsg() : this.showErrMsg();
    // return true;
    // console.log(this.users);
    // this.isRegistered(uname, password);
    return this.isRegistered(uname, password).then(res => {
      if (res === true) {
        this.showSuccessMsg();
        return true;
      } else {
        this.showErrMsg();
        return false;
      }
    });

  }

  showErrMsg() {
    this.loginStatus = 'error';
    document.getElementById('errMsg').style.display = 'block';
  }

  showSuccessMsg() {
    this.loginStatus = 'success';
    document.getElementById('successMsg').style.display = 'block';
  }

}
