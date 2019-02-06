import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  addPost: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.addPost = '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }

  addFollower(event) {
    // console.log(this.addPost);
    // if (this.addPost !== '') {
      this.addPost = event;
      // console.log('event:' + JSON.parse(event));
    // }
  }
}
