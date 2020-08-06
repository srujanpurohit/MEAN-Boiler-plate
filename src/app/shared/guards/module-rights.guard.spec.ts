import { TestBed } from '@angular/core/testing';

import { ModuleRightsGuard } from './module-rights.guard';

describe('ModuleRightsGuard', () => {
  let guard: ModuleRightsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModuleRightsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
