import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  animations: [
    trigger('cv', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-10px)',
        }),
        animate('500ms 500ms'),
      ])
    ]),


  ],
})
export class CvComponent {
  constructor(private router: Router) {}
  toggleChecked = false;

  toggleCV() {
    this.toggleChecked = !this.toggleChecked;
  }
  downloadCV() {
    const filePath = '../../assets/docs/cv.pdf';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'CV_DELAUNAY_Alexis.pdf';
    link.click();
  }

  downloadLettre() {
    const filePath = '../../assets/docs/lettre_de_motivation.pdf';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'Lettre_de_motivation_DELAUNAY_Alexis.pdf'; // Le nom du fichier lors du téléchargement
    link.click();
  }
  navigateToExternalLink(link: string) {
    window.open(link, '_blank');
  }
}
