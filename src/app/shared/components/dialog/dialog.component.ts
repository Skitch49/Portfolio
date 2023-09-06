import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }



  navigateToExternalLink(link: string) {
    window.open(link, '_blank'); // Ouvre le lien dans un nouvel onglet
  }
}
