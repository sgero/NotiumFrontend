import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-headerocionocturno',
  templateUrl: './headerocionocturno.component.html',
  styleUrls: ['./headerocionocturno.component.scss'],
  standalone: true
})
export class HeaderocionocturnoComponent  implements OnInit {

  constructor(private router: Router) { }

  onRegisterButtonClick() {

    this.router.navigate(['/notium/registrar']);

  }

  onLoginButtonClick() {

    this.router.navigate(['/notium/login']);


  }
  ngOnInit() {return null}

}

