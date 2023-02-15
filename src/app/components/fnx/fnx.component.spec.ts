import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnxComponent } from './fnx.component';

describe('FnxComponent', () => {
  let component: FnxComponent;
  let fixture: ComponentFixture<FnxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FnxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FnxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
