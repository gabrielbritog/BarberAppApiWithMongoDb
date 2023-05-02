/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewClientComponent } from './NewClient.component';

describe('NewClientComponent', () => {
  let component: NewClientComponent;
  let fixture: ComponentFixture<NewClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
