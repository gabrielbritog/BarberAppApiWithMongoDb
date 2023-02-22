/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarberModalComponent } from './BarberModal.component';

describe('BarberModalComponent', () => {
  let component: BarberModalComponent;
  let fixture: ComponentFixture<BarberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
