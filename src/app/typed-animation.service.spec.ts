import { TestBed } from '@angular/core/testing';

import { TypedAnimationService } from './typed-animation.service';

describe('TypedAnimationService', () => {
  let service: TypedAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypedAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
