import { TestBed } from '@angular/core/testing';

import { HeadlineService } from './headline.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('HeadlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: HeadlineService = TestBed.get(HeadlineService);
    expect(service).toBeTruthy();
  });
});
