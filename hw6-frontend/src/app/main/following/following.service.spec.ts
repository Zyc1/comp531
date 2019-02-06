import { TestBed } from '@angular/core/testing';

import { FollowingService } from './following.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('FollowingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: FollowingService = TestBed.get(FollowingService);
    expect(service).toBeTruthy();
  });
});
