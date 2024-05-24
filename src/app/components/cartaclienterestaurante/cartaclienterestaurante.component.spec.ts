import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartaclienterestauranteComponent } from './cartaclienterestaurante.component';

describe('CartaclienterestauranteComponent', () => {
  let component: CartaclienterestauranteComponent;
  let fixture: ComponentFixture<CartaclienterestauranteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaclienterestauranteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartaclienterestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
