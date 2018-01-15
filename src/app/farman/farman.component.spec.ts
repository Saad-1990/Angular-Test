import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmanComponent } from './farman.component';

describe('FarmanComponent', () => {
  let component: FarmanComponent;
  let fixture: ComponentFixture<FarmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
