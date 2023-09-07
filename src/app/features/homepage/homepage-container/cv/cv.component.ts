import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
    animations: [
    trigger("cv", [
      transition(":enter" , [
        style({
          opacity: 0,
          transform: 'translateX(-10px)'
        }),
         animate('500ms 500ms')
      ])
    ],
    ),

    // trigger("container", [
    //   transition(":enter", [
    //     query(".sectionWave", [
    //       style({
    //         opacity: 0,
    //         transform: 'translateY(200px)'
    //       }),
    //       animate('1000ms 2000ms')
    //     ])
    //   ])
    // ])
  ]
})
export class CvComponent {
 
  constructor(private router: Router) {}

  // Méthode pour télécharger le CV
  downloadCV() {
    const filePath = '../../assets/docs/cv.pdf';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'CV_DELAUNAY_Alexis.pdf'; // Le nom du fichier lors du téléchargement
    link.click();
  }

  navigateToExternalLink(link: string) {
    window.open(link, '_blank'); // Ouvre le lien dans un nouvel onglet
  }
}