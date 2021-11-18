import { TestBed } from '@angular/core/testing';

import { MessaginService } from './messagin.service';

describe('MessaginService', () => {
  let service: MessaginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessaginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
