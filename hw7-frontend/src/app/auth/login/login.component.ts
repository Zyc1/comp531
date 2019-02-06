import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users;
  loginStatus: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
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
        this.login((<HTMLInputElement>username).value, (<HTMLInputElement>password).value);
    }
  }

  register() {
    this.router.navigate(['registration']);
  }

  login(username: string, password: string) {
    return this.http.post('https://hw7server.herokuapp.com/login', {username: username, password: password}, {withCredentials: true})
      .subscribe(
          res => {
              if (res['result'] === 'success') {
                  this.showSuccessMsg();
                  localStorage.setItem('username', username);
                  this.router.navigate(['main']);
              }
          },
          err => {
            this.showErrMsg();
          },
        );
  }

  fbLogin() {
      document.location.href = 'https://hw7server.herokuapp.com/facebook/login';
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
