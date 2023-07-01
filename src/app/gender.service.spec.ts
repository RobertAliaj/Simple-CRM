import { TestBed } from '@angular/core/testing';

import { GenderService } from './gender.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GenderService', () => {
  let service: GenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
