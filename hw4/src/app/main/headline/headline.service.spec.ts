import { TestBed } from '@angular/core/testing';

import { HeadlineService } from './headline.service';

describe('HeadlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeadlineService = TestBed.get(HeadlineService);
    expect(service).toBeTruthy();
  });
});
