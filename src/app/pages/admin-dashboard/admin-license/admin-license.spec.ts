import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLicense } from './admin-license';

describe('AdminLicense', () => {
  let component: AdminLicense;
  let fixture: ComponentFixture<AdminLicense>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLicense],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLicense);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
