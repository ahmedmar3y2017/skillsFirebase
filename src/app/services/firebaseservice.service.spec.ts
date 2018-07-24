import { TestBed, inject } from '@angular/core/testing';

import { FirebaseserviceService } from './firebaseservice.service';

describe('FirebaseserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseserviceService]
    });
  });

  it('should be created', inject([FirebaseserviceService], (service: FirebaseserviceService) => {
    expect(service).toBeTruthy();
  }));
});
