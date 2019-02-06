import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    let valid = true;
    const childNodes = document.getElementById('msg').childNodes;
    if ( childNodes.length !== 0 ) {
      document.getElementById('message').style.visibility = 'hidden';
      document.getElementById('alert').style.display = 'none';
      for (let i = childNodes.length - 1; i >= 0; i--) {
        document.getElementById('msg').removeChild(childNodes[i]);
      }
    }
    if (!(<HTMLInputElement>document.getElementById('accountName')).checkValidity()) {
      valid = false;
      const li = document.createElement('li');
      if ((<HTMLInputElement>document.getElementById('accountName')).value === '') {
        li.innerHTML = 'Please enter your Account Name';
      } else {li.innerHTML = 'Only upper or lower case letters and numbers are allowed. Do not start with a number'; }
      document.getElementById('msg').appendChild(li);
      document.getElementById('message').style.visibility = 'visible';
    }
    if (!(<HTMLInputElement>document.getElementById('email')).checkValidity()) {
      valid = false;
      const li = document.createElement('li');
      if ((<HTMLInputElement>document.getElementById('email')).value === '') {
        li.innerHTML = 'Please enter your Email Address';
      } else {li.innerHTML = 'Please check your email address'; }
      document.getElementById('msg').appendChild(li);
      document.getElementById('message').style.visibility = 'visible';
    }
    if (!(<HTMLInputElement>document.getElementById('phone')).checkValidity()) {
      valid = false;
      const li = document.createElement('li');
      if ((<HTMLInputElement>document.getElementById('phone')).value === '') {
        li.innerHTML = 'Please enter your Phone Number';
      } else {li.innerHTML = 'Please check your phone number'; }
      document.getElementById('msg').appendChild(li);
      document.getElementById('message').style.visibility = 'visible';
    }
    if (!(<HTMLInputElement>document.getElementById('birthdate')).checkValidity()) {
      valid = false;
      const li = document.createElement('li');
      if ((<HTMLInputElement>document.getElementById('birthdate')).value === '') {
        li.innerHTML = 'Please enter your Birth Date';
      } else {li.innerHTML = 'Please check your birth date'; }
      document.getElementById('msg').appendChild(li);
      document.getElementById('message').style.visibility = 'visible';
    }
    if (!(<HTMLInputElement>document.getElementById('zipcode')).checkValidity()) {
      valid = false;
      const li = document.createElement('li');
      if ((<HTMLInputElement>document.getElementById('zipcode')).value === '') {
        li.innerHTML = 'Please enter your Zip Code';
      } else {li.innerHTML = 'Please check your zip code'; }
      document.getElementById('msg').appendChild(li);
      document.getElementById('message').style.visibility = 'visible';
    }
    if (!(<HTMLInputElement>document.getElementById('password')).checkValidity()) {
      valid = false;
      const li = document.createElement('li');
      li.innerHTML = 'Please enter your Password';
      document.getElementById('msg').appendChild(li);
      document.getElementById('message').style.visibility = 'visible';
    }
    if (!(<HTMLInputElement>document.getElementById('confirmation')).checkValidity()) {
      valid = false;
      const li = document.createElement('li');
      li.innerHTML = 'Please confirm your Password';
      document.getElementById('msg').appendChild(li);
      document.getElementById('message').style.visibility = 'visible';
    }
    let birthValid = true;
    const now = new Date();
    const birth = new Date((<HTMLInputElement>document.getElementById('birthdate')).value);
    let age = now.getFullYear() - birth.getFullYear();
    const month = now.getMonth() - birth.getMonth();
    const day = now.getDate() - birth.getDate();
    if (month < 0 || (month === 0 && day < 0)) { age--; }
    if (age < 18) {
      document.getElementById('alert').style.display = 'block';
      birthValid = false;
    }

    let passwordValid = true;
    if ((<HTMLInputElement>document.getElementById('password')).value !==
      (<HTMLInputElement>document.getElementById('confirmation')).value) {
      const li = document.createElement('li');
      li.innerHTML = 'The password and confirmation password do not match, please check your password and confirmation password';
      document.getElementById('msg').appendChild(li);
      passwordValid = false;
      document.getElementById('message').style.visibility = 'visible';
    }
    if (valid && birthValid && passwordValid) {
      // this.router.navigate(['main']);
    }
  }

  reset() {
    const childNodes = document.getElementById('msg').childNodes;
    if ( childNodes.length !== 0 ) {
      document.getElementById('message').style.visibility = 'hidden';
      document.getElementById('alert').style.display = 'none';
      for (let i = childNodes.length - 1; i >= 0; i--) {
        document.getElementById('msg').removeChild(childNodes[i]);
      }
    }
    (<HTMLFormElement>document.getElementById('registerForm')).reset();
  }

}
