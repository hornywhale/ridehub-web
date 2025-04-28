import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoMapComponent } from './moto-map.component';

describe('MotoMapComponent', () => {
  let component: MotoMapComponent;
  let fixture: ComponentFixture<MotoMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
