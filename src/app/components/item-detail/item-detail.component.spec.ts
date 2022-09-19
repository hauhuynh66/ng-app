import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailComponentComponent } from './item-detail.component';

describe('ItemDetailComponentComponent', () => {
  let component: ItemDetailComponentComponent;
  let fixture: ComponentFixture<ItemDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
