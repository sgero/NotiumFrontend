import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListarValoracionesOcioComponent } from './listar-valoraciones-ocio.component';

describe('ListarValoracionesOcioComponent', () => {
  let component: ListarValoracionesOcioComponent;
  let fixture: ComponentFixture<ListarValoracionesOcioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarValoracionesOcioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarValoracionesOcioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
