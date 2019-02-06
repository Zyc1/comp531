import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  addPost: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.addPost = '';
  }

  logout() {
    this.http.put('https://hw6server.herokuapp.com/logout', {}, {withCredentials: true})
        .subscribe(res => {
          console.log(res);
        });
    // localStorage.clear();
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
