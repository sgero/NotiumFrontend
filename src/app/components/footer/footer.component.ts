import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true
})
export class FooterComponent  implements OnInit {

  emailLink: any;

  constructor(private sanitizer: DomSanitizer) {
    const email = 'info@notium.com'; // Dirección de correo electrónico
    const mailtoLink = `mailto:${email}`;
    this.emailLink = this.sanitizer.bypassSecurityTrustUrl(mailtoLink);
  }
  ngOnInit() {}

}
