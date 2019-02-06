import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile() {
      return this.http.get('https://hw7server.herokuapp.com/profile', {withCredentials: true});
  }

  uploadAvatar(data: FormData) {
      return this.http.put('https://hw7server.herokuapp.com/uploadAvatar', data, {withCredentials: true});
  }

  updateAvatar(avatar: string) {
      return this.http.put('https://hw7server.herokuapp.com/avatar', {avatar: avatar}, {withCredentials: true});
  }

}
