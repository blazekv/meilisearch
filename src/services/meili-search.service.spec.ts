import { TestBed } from '@angular/core/testing';

import { MeiliSearchService } from './meili-search.service';

describe('MeiliSearchService', () => {
  let service: MeiliSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeiliSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
