import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact-container/contact.component';
import { FormModule } from 'src/app/shared/modules/form.module';
import { RouterModule } from '@angular/router';
import { CONTACT_ROUTES } from './contact.routes';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CONTACT_ROUTES),
    FormModule,
  ]
})
export class ContactModule { }
