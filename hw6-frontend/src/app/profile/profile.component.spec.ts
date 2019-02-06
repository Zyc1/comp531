import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from '../auth/login/login.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent, LoginComponent],
      imports: [RouterModule, RouterTestingModule, HttpClientModule],
      providers: [HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the login user profile information', function () {
    localStorage.setItem('username', 'Kristy');
    component.getUserInfo().then(res => {
      expect(res.name).toEqual('Kristy');
      expect(res.email).toEqual('yz141@rice.edu');
      expect(res.tel).toEqual('111-111-1111');
      expect(res.birthday).toEqual('11-08-1992');
      expect(res.zipcode).toEqual('77005');
    });
  });
});
