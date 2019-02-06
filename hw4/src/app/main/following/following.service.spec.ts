import { TestBed } from '@angular/core/testing';

import { FollowingService } from './following.service';

describe('FollowingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowingService = TestBed.get(FollowingService);
    expect(service).toBeTruthy();
  });
});
