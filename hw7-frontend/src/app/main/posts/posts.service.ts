import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  getArticles() {
    return this.http.get('https://hw7server.herokuapp.com/articles', {withCredentials: true});
  }

  putArticles(postId: string, text: string, commentId: string) {
    return this.http.put('https://hw7server.herokuapp.com/articles/' + postId, {text: text, commentId: commentId}, {withCredentials: true});
  }
}
