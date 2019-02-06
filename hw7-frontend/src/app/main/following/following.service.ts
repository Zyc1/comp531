import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {


  constructor(private http: HttpClient) { }

  getFollowingList() {
      return this.http.get('https://hw7server.herokuapp.com/following/', {withCredentials: true});
  }

  getFollowers() {
      return this.http.get('https://hw7server.herokuapp.com/followingProfile', {withCredentials: true});
  }
}
