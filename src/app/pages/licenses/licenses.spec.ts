import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicensesComponent } from './licenses';

describe('Licenses', () => {
  let component: LicensesComponent;
  let fixture: ComponentFixture<LicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicensesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LicensesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
