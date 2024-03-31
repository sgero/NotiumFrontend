import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-footerrestaurante',
  templateUrl: './footerrestaurante.component.html',
  styleUrls: ['./footerrestaurante.component.scss'],
  standalone: true
})
export class FooterrestauranteComponent  implements OnInit {

  emailLink: any;

  constructor(private sanitizer: DomSanitizer) {
    const email = 'info@notium.com'; // Dirección de correo electrónico
    const mailtoLink = `mailto:${email}`;
    this.emailLink = this.sanitizer.bypassSecurityTrustUrl(mailtoLink);
  }
  ngOnInit() {}

}
