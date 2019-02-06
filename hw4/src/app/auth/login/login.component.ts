import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

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
      this.router.navigate(['main']);
      document.getElementById('message').style.visibility = 'hidden';
    }
  }

  register() {
    this.router.navigate(['registration']);
  }

}
