import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeiliStatsComponent } from './meili-stats.component';

describe('MeiliStatsComponent', () => {
  let component: MeiliStatsComponent;
  let fixture: ComponentFixture<MeiliStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeiliStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeiliStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
