import {Component, HostListener, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostsService} from './posts.service';
import {FollowingComponent} from '../following/following.component';
import {FollowingService} from '../following/following.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  initialPosts;
  posts;
  keyword: string;
  fetchFeeds;

  @Input()
  set addNewPosts(addPost: string) {
    if (addPost !== null && addPost !== '') {
      console.log('addPosts:' + addPost);
      const res = JSON.parse(addPost);
      console.log(res);
      if (res.status === 1) {
          this.http.get('https://hw6server.herokuapp.com/articles', {withCredentials: true})
              .subscribe( data => {
                  this.posts = data['articles'];
              });
        /*for (let i = 0; i < this.initialPosts.filter(it => it.author === res.username).length; i++) {
          const newPost = this.initialPosts.filter(it => it.author === res.username)[i];
          console.log(newPost);
          const insertIndex = this.getIndex(this.posts, newPost.timestamp);
          console.log(insertIndex);
          this.posts.splice(insertIndex, 0 , newPost);
          // this.posts.push(this.initialPosts.filter(it => it.author === res.username)[i]);
        }*/
      } else {
        this.posts = this.posts.filter(it => it.author !== res.username);
      }
    }
  }

  constructor(private http: HttpClient, private postServ: PostsService, private fServ: FollowingService) { }

  ngOnInit() {
    this.http.get('https://hw6server.herokuapp.com/articles', {withCredentials: true})
        .subscribe( res => {
          this.posts = res['articles'].sort(this.sortPost);
        });
    /*this.postServ.getPost().subscribe(data => {
      this.initialPosts = data;
      this.posts = this.initialPosts.filter(it => it.author === localStorage.getItem('username'));
    });*/
    // this.fetchFeeds = new Array();
  }

  /*fetchArticles(username): Promise<any> {
    return fetch('../../../assets/articles.json')
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < Object.values(res).length; i++) {
          if (Object.values(res)[i]['author'] === localStorage.getItem('username')) {
            this.fetchFeeds.push(Object.values(res)[i]);
          }
        }
        return this.fetchFeeds;
      });
  }*/

  /*updateArticles(username, status) {
      if (status === 1) {
        for (let i = 0; i < this.posts.filter(it => it.author === username).length; i++) {
          const newPost = this.posts.filter(it => it.author === username)[i];
          this.fetchFeeds.push(newPost);
          return this.fetchFeeds.length;
        }
      } else {
        this.posts = this.posts.filter(it => it.author !== username);
        return this.posts.length;
      }
  }*/

  /*getIndex(posts, date) {
    for (let i = 0; i < posts.length; i++) {
      if (this.compareDate(posts[i].timestamp, date) > 0) {
        return i;
      }
    }
    return posts.length;
  }

  compareDate(date1, date2) {
    const date1Arr = date1.split('-');
    const date2Arr = date2.split('-');
    const year1 = date1Arr[2];
    const year2 = date2Arr[2];
    const month1 = date1Arr[0];
    const month2 = date2Arr[0];
    const day1 = date1Arr[1];
    const day2 = date2Arr[1];
    const diffYear = year2 - year1;
    const diffMonth = month2 - month1;
    const diffDay = day2 - day1;
    if (diffYear > 0 || (diffYear === 0 && diffMonth > 0) || diffYear === 0 && diffMonth === 0 && diffDay > 0) {
      return 1;
    } else {
      return -1;
    }
  }*/

  sortPost(a, b) {
    console.log(a.date);
    console.log(b.date);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  updateKeyword(keyword) {
    this.keyword = keyword;
    this.search(this.keyword);
    return this.keyword;
  }

  search(keyword) {
    const filter = keyword;
    this.posts = this.posts.filter(it => it.author.indexOf(filter) >= 0 || it.text.indexOf(filter) >= 0);
    return this.posts.length;
  }

  clear() {
    (<HTMLInputElement>document.getElementById('newPost')).value = '';
  }

  postNew() {
    const timestamp = new Date().getTime();
    /*const year = timestamp.getFullYear();
    const month = (timestamp.getMonth() + 1 < 10 ? '0' + (timestamp.getMonth() + 1) : timestamp.getMonth() + 1);
    const day = (timestamp.getDate() < 10 ? '0' + timestamp.getDate() : timestamp.getDate());
    const date = month + '-' + day + '-' + year;
    const post = (<HTMLInputElement>document.getElementById('newPost')).value;
    const newPo = {
      'text': post,
      'img': '',
      'author': localStorage.getItem('username'),
      'avatar': localStorage.getItem('avatar'),
      'timestamp': date,
    };
    this.posts.splice(0, 0, newPo);
    this.clear();*/
    const post = (<HTMLInputElement>document.getElementById('newPost')).value;
    this.http.post('https://hw6server.herokuapp.com/article', {text: post}, {withCredentials: true})
        .subscribe(res => {
          this.posts.splice(0, 0, res['articles'][0]);
          this.clear();
        });
  }

}
