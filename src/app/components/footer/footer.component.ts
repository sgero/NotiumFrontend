import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {EmailService} from "../../services/email.service";
import {IonicModule, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class FooterComponent  implements OnInit {

  emailLink: any;

  constructor(private sanitizer: DomSanitizer,
      private emailService: EmailService,
              private toastController: ToastController) {
    const email = 'notiumevents@gmail.com'; // Dirección de correo electrónico
    const mailtoLink = `mailto:${email}`;
    this.emailLink = this.sanitizer.bypassSecurityTrustUrl(mailtoLink);
  }


  async sendEmail() {
    this.emailService.sendEmail('notiumevents@gmail.com', 'Subject', 'Message body')
      .subscribe({
        next: async (response) => {
          const toast = await this.toastController.create({
            message: 'Correo enviado exitosamente',
            duration: 2000,
            position: 'top',
            color: 'success'
          });
          toast.present();
        },
        error: async (error) => {
          const toast = await this.toastController.create({
            message: 'Error al enviar el correo. Necesita estar logueado.',
            duration: 2000,
            position: 'top',
            color: 'danger'
          });
          await toast.present();
        }
      });
  }


  ngOnInit() {}

}
