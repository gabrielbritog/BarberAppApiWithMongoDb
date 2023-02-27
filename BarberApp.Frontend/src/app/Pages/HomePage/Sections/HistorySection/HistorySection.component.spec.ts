/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HistorySectionComponent } from './HistorySection.component';

describe('HistorySectionComponent', () => {
  let component: HistorySectionComponent;
  let fixture: ComponentFixture<HistorySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
