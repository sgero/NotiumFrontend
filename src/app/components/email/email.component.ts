// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-email',
//   templateUrl: './email.component.html',
//   styleUrls: ['./email.component.scss'],
// })
// export class EmailComponent  implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {}
//
// }
import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  standalone: true
})
export class EmailComponent {
  constructor(private emailService: EmailService, private toastController: ToastController) { }

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
            message: 'Error al enviar el correo',
            duration: 2000,
            position: 'top',
            color: 'danger'
          });
          toast.present();
        }
      });
  }
}
