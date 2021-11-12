import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorsComponent } from './scors.component';

describe('ScorsComponent', () => {
  let component: ScorsComponent;
  let fixture: ComponentFixture<ScorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
