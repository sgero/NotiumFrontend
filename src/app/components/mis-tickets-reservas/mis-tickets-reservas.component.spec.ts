import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisTicketsReservasComponent } from './mis-tickets-reservas.component';

describe('MisTicketsReservasComponent', () => {
  let component: MisTicketsReservasComponent;
  let fixture: ComponentFixture<MisTicketsReservasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTicketsReservasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisTicketsReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
