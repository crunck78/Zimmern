import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitworkComponent } from './submitwork.component';

describe('SubmitworkComponent', () => {
  let component: SubmitworkComponent;
  let fixture: ComponentFixture<SubmitworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
