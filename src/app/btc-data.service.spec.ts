import { TestBed } from '@angular/core/testing';

import { BtcDataService } from './btc-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('BtcDataService', () => {
  let service: BtcDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BtcDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
