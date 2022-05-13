import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmuploadComponent } from './comfirmupload.component';

describe('ComfirmuploadComponent', () => {
  let component: ComfirmuploadComponent;
  let fixture: ComponentFixture<ComfirmuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComfirmuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfirmuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
