import { TestBed } from '@angular/core/testing';

import { CartarestauranteService } from './cartarestaurante.service';

describe('CartarestauranteService', () => {
  let service: CartarestauranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartarestauranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
