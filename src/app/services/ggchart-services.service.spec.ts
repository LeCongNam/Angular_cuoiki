import { TestBed } from '@angular/core/testing';

import { GGChartServicesService } from './ggchart-services.service';

describe('GGChartServicesService', () => {
  let service: GGChartServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GGChartServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
