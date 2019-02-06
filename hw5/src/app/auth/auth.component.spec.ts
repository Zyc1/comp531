import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent, LoginComponent ],
      imports: [RouterModule, RouterTestingModule, HttpClientModule],
      providers: [HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
