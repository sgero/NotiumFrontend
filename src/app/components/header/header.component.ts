import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router) { }

  onToggleButtonClick() {

  }

  onRegisterButtonClick() {

    this.router.navigate(['/notium/registrar']);

  }

  onLoginButtonClick() {

    this.router.navigate(['/notium/login']);


  }
  ngOnInit() {return null}

}
