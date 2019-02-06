import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get('../../assets/profile.json');
  }
}
