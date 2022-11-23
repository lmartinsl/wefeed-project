import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChoiceModalComponent } from './user-choice-modal.component';

describe('UserChoiceModalComponent', () => {
  let component: UserChoiceModalComponent;
  let fixture: ComponentFixture<UserChoiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChoiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
