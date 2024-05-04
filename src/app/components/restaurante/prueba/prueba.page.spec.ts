import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebaPage } from './prueba.page';

describe('PruebaPage', () => {
  let component: PruebaPage;
  let fixture: ComponentFixture<PruebaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PruebaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
