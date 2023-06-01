/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AvaliationClientComponent } from './AvaliationClient.component';

describe('AvaliationClientComponent', () => {
  let component: AvaliationClientComponent;
  let fixture: ComponentFixture<AvaliationClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliationClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
