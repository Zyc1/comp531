import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts;

  constructor(private postServ: PostsService) { }

  ngOnInit() {
    this.postServ.getPost().subscribe(data => this.posts = data);
  }

  search() {
    const filter = (<HTMLInputElement>document.getElementById('searchInput')).value;
    this.posts = this.posts.filter(it => it.author.indexOf(filter) >= 0 || it.text.indexOf(filter) >= 0);
  }

  clear() {
    (<HTMLInputElement>document.getElementById('newPost')).value = '';
  }

  postNew() {
    const timestamp = new Date();
    const year = timestamp.getFullYear();
    const month = (timestamp.getMonth() + 1 < 10 ? '0' + (timestamp.getMonth() + 1) : timestamp.getMonth() + 1);
    const day = (timestamp.getDay() < 10 ? '0' + timestamp.getDay() : timestamp.getMonth());
    const date = month + '-' + day + '-' + year;
    const post = (<HTMLInputElement>document.getElementById('newPost')).value;
    console.log(post);
    const newPo = {
      'text': post,
      'img': '',
      'author': 'Kristy',
      'avatar': '../../../../images/kristy.png',
      'timestamp': date,
    };

    this.posts.splice(0, 0, newPo);
    this.clear();
  }
}
