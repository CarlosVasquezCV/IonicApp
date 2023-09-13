import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JsonapiPage } from './jsonapi.page';

describe('JsonapiPage', () => {
  let component: JsonapiPage;
  let fixture: ComponentFixture<JsonapiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JsonapiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
