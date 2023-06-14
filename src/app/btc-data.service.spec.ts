import { TestBed } from '@angular/core/testing';

import { BtcDataService } from './btc-data.service';

describe('BtcDataService', () => {
  let service: BtcDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtcDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
