import { TestBed } from '@angular/core/testing';

import { OwnerManagementService } from './owner-management.service';

describe('OwnerManagementService', () => {
  let service: OwnerManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
