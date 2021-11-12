import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorsListComponent } from './scors-list.component';

describe('ScorsListComponent', () => {
  let component: ScorsListComponent;
  let fixture: ComponentFixture<ScorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
