import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryItemCardComponent } from './category-item-card.component';

describe('CategoryItemCardComponent', () => {
  let component: CategoryItemCardComponent;
  let fixture: ComponentFixture<CategoryItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryItemCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
