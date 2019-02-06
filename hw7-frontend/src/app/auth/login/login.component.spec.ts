import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('login only registered users', () => {
  //   component.login('Kristy', 'yz141').then(res => {
  //     expect(res).toEqual(true);
  //   });
  // });

  // it('should update success message', () => {
  //   // spyOn(component, 'showSuccessMsg');
  //   component.login('Kristy', 'yz141').then(res => {
  //     // const spy = spyOn(component, 'showSuccessMsg').and.callThrough();
  //     // expect(component.showSuccessMsg).toHaveBeenCalled();
  //     expect(component.loginStatus).toBe('success');
  //   });
  // });
  //
  // it('should not login an invalid user', () => {
  //   component.login('username', 'password').then(res => {
  //     expect(res).toEqual(false);
  //   });
  // });
  //
  // it('should update error message', () => {
  //   // spyOn(component, 'showErrMsg');
  //   component.login('username', 'password').then(res => {
  //     expect(component.loginStatus).toBe('error');
  //   });
  // });
});
