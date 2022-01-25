import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsesComponent } from './admin-uses.component';

describe('AdminUsesComponent', () => {
  let component: AdminUsesComponent;
  let fixture: ComponentFixture<AdminUsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
