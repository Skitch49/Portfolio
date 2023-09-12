import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public envoie = false;
  //getter
  get nom() {
    return this.form.get('nom');
  }
  get email() {
    return this.form.get('email');
  }
  get message() {
    return this.form.get('message');
  }

  constructor(private fb: FormBuilder) {}

  public form: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.required,Validators.email])],
    nom: ['',Validators.compose([Validators.required,Validators.minLength(2)])],
    message: ['',Validators.required],
  });

  async submit() {


    if(this.form.valid){
      emailjs.init('fgE238biR3koMQoGh');
      let response = await emailjs.send("service_zw2s6sp","template_w1hgv7m",{
      from_name: this.form.value.nom,
      message: this.form.value.message,
      reply_to: this.form.value.email,
      from_email: this.form.value.email,
      });
      this.form.reset();
      this.envoie = true;
    }
    else{
      this.envoie = false;
    }


  }
}
