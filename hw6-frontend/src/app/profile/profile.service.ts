import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile() {
      return this.http.get('https://hw6server.herokuapp.com/profile', {withCredentials: true});
    // return this.http.get('../../assets/profile.json');
  }

  getHeadlines() {
    return this.http.get('http:/127.0.0.1:3000/headlines');
  }

}
