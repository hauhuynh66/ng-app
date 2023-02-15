import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeProcessesComponent } from './officeprocs.component';

describe('OfficeProcessesComponent', () => {
  let component: OfficeProcessesComponent;
  let fixture: ComponentFixture<OfficeProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeProcessesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
