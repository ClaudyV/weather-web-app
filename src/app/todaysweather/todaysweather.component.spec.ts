import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysweatherComponent } from './todaysweather.component';

describe('TodaysweatherComponent', () => {
  let component: TodaysweatherComponent;
  let fixture: ComponentFixture<TodaysweatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysweatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
