import { Component, OnInit } from '@angular/core';
import {HeadlineService} from './headline.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  user;
  newStatus: string;

  constructor(private uServ: HeadlineService) { }

  ngOnInit() {
    this.uServ.getUserInfo().subscribe(data => this.user = data);
  }

  updateStatus() {
    this.user[0].headline = this.newStatus;
  }
}
