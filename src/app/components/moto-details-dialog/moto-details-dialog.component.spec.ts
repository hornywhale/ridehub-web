import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoDetailsDialogComponent } from './moto-details-dialog.component';

describe('MotoDetailsDialogComponent', () => {
  let component: MotoDetailsDialogComponent;
  let fixture: ComponentFixture<MotoDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotoDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
