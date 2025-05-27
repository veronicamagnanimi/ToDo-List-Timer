import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksInputComponent } from './tasks-input.component';

describe('TasksInputComponent', () => {
  let component: TasksInputComponent;
  let fixture: ComponentFixture<TasksInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
