import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorsFormComponent } from './scors-form.component';

describe('ScorsFormComponent', () => {
  let component: ScorsFormComponent;
  let fixture: ComponentFixture<ScorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
