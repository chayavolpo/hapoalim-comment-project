import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseActiveUserComponent } from './choose-active-user.component';

describe('ChooseActiveUserComponent', () => {
  let component: ChooseActiveUserComponent;
  let fixture: ComponentFixture<ChooseActiveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseActiveUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseActiveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
