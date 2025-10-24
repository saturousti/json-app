import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pulsatility } from './pulsatility';

describe('Pulsatility', () => {
  let component: Pulsatility;
  let fixture: ComponentFixture<Pulsatility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pulsatility]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pulsatility);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
