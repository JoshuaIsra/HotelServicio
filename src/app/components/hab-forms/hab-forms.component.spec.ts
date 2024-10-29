import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabFormsComponent } from './hab-forms.component';

describe('HabFormsComponent', () => {
  let component: HabFormsComponent;
  let fixture: ComponentFixture<HabFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
