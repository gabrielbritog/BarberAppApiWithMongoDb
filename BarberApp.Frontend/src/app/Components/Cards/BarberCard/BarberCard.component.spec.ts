/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarberCardComponent } from './BarberCard.component';

describe('BarberCardComponent', () => {
  let component: BarberCardComponent;
  let fixture: ComponentFixture<BarberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
