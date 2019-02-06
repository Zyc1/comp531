import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });

  /*it('should fetch the login user profile information', () => {
    service.getProfile().then(res => {
      res
    })
  });*/
});
