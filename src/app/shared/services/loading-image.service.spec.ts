import { TestBed } from '@angular/core/testing';

import { LoadingImageService } from './loading-image.service';

describe('LoadingImageService', () => {
  let service: LoadingImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
