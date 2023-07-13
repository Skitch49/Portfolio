import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
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

  public submit(): void {
    // console.log(this.form.value);
    // this.form.reset();
    // console.log(this.form);
  }
}
