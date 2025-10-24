import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hrv } from './hrv';

describe('Hrv', () => {
  let component: Hrv;
  let fixture: ComponentFixture<Hrv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hrv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hrv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
