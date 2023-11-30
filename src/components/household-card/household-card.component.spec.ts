import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdCardComponent } from './household-card.component';

describe('HouseholdCardComponent', () => {
  let component: HouseholdCardComponent;
  let fixture: ComponentFixture<HouseholdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseholdCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseholdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
