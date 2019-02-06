import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {FollowingComponent} from './following/following.component';
import {HeadlineComponent} from './headline/headline.component';
import {PostsComponent} from './posts/posts.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, FollowingComponent, HeadlineComponent, PostsComponent ],
      imports: [RouterModule, FormsModule, RouterTestingModule, HttpClientModule],
      providers: [HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out a user', function () {
    component.logout();
    // console.log(browser.getCurrentUrl());
    // expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/auth');
    expect(localStorage.length).toEqual(0);
  });
});
