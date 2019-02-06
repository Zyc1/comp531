import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {promise} from 'selenium-webdriver';
import filter = promise.filter;

@Injectable({
  providedIn: 'root'
})
export class FollowingService {


  constructor(private http: HttpClient) { }

  getFollowers() {
    return this.http.get('../../assets/followers.json');
  }
}
