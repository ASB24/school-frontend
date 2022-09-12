import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPackageComponent } from './student-package.component';

describe('StudentPackageComponent', () => {
  let component: StudentPackageComponent;
  let fixture: ComponentFixture<StudentPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
