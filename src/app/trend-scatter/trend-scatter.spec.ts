import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendScatter } from './trend-scatter';

describe('TrendScatter', () => {
  let component: TrendScatter;
  let fixture: ComponentFixture<TrendScatter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendScatter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendScatter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
