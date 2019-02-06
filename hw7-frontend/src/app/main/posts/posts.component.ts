import {Component, HostListener, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../../profile/profile.service';
import {PostsService} from './posts.service';
import {post} from 'selenium-webdriver/http';
declare var $: any;


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts;
  keyword: string;
  img: File = null;
  imgUrl: string;
  text: string;

  @Input()
  set addNewPosts(addPost: string) {
    if (addPost !== null && addPost !== '') {
      // console.log('addPosts:' + addPost);
      const res = JSON.parse(addPost);
      // console.log(res);
      if (res.status === 1) {
          this.http.get('https://hw7server.herokuapp.com/articles', {withCredentials: true})
              .subscribe( data => {
                  this.posts = data['articles'].sort(this.sortPost);
              });
      } else {
        this.posts = this.posts.filter(it => it.author !== res.username);
      }
    }
  }

  constructor(private http: HttpClient, private pServ: ProfileService, private postServ: PostsService) { }

  ngOnInit() {
    this.postServ.getArticles().subscribe( res => {
          this.posts = res['articles'].sort(this.sortPost);
        });
  }

  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.img = <File>event.target.files[0];
      // const imgReader = new FileReader();
      // imgReader.onload = (e: any) => this.imgUrl = e.target.result;
      // imgReader.readAsDataURL(event.target.files[0]);

      const data = new FormData();
      data.append('image', this.img, this.img.name);
      // console.log(this.img);
      this.pServ.uploadAvatar(data).subscribe(res => {
        if (res['img']) {
          // console.log('test url: ' + this.imgUrl);
          this.imgUrl = res['img'];
        } else {
          this.imgUrl = '';
        }
      });
    }
  }

  sortPost(a, b) {
    // console.log(a.date);
    // console.log(b.date);
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
    // const timestamp = new Date().getTime();
    const article = (<HTMLInputElement>document.getElementById('newPost')).value;
    // console.log('imgUrl: ' + this.imgUrl);
    this.http.post('https://hw7server.herokuapp.com/article', {image: this.imgUrl, text: article}, {withCredentials: true})
        .subscribe(res => {
          this.posts.splice(0, 0, res['articles'][0]);
          this.clear();
        });
  }

  showModal(author: string, postId: string) {
      let str = '';
      if (author !== localStorage.getItem('username')) {
        $('#warning').modal('show');
      } else {
        const el = '#modal' + postId;
        // console.log($(el));
          $(el).modal({
              onVisible: function() {
                  const textarea = el + ' #newArticle';
                  $(textarea).keypress(function (e) {
                      str += String.fromCharCode(e.keyCode);
                      // console.log(str);
                      (<HTMLInputElement>document.getElementById('newArticle')).innerHTML = str;
                      // console.log((<HTMLInputElement>document.getElementById('newArticle')).innerHTML);
                  });
              }
          }).modal('show');
      }
  }


  updatePost(postId: string) {
      // const el = (<HTMLDivElement>document.getElementById('modal'));
      // console.log('postId:' + postId);
      const text = (<HTMLInputElement>document.getElementById('newArticle')).innerHTML;
      this.postServ.putArticles(postId, text, '').subscribe(result => {
          this.postServ.getArticles().subscribe( res => {
              this.posts = res['articles'].sort(this.sortPost);
          });
      });
  }

  showCommentModal(name: string, commentId: string) {
    // console.log('commentId: ' + commentId);
      let str = '';
      if (name !== localStorage.getItem('username')) {
          $('#warning').modal('show');
      } else {
          const el = '#editComment' + commentId;
          $(el).modal({
              onVisible: function() {
                  const textarea = el + ' #newComment';
                  $(textarea).keypress(function (e) {
                      str += String.fromCharCode(e.keyCode);
                      (<HTMLInputElement>document.getElementById('newComment')).innerHTML = str;
                  });
              }
          }).modal('show');
      }
  }

  editComment(postId: string, commentId: string) {
    const comment = (<HTMLInputElement>document.getElementById('newComment')).innerHTML;
    this.postServ.putArticles(postId, comment, commentId).subscribe(result => {
        this.postServ.getArticles().subscribe( res => {
            this.posts = res['articles'].sort(this.sortPost);
        });
    });
  }

  addReply(postId: string, commentId: string) {
    const el = 'newReply' + postId;
    const text = (<HTMLInputElement>document.getElementById(el)).value;
    // console.log('newReply: ' + text);
    // console.log('postid: ' + postId);
    // console.log('commentId: ' + commentId);
    this.postServ.putArticles(postId, text, commentId).subscribe(result => {
        this.postServ.getArticles().subscribe( res => {
            this.posts = res['articles'].sort(this.sortPost);
        });
    });
  }

}
