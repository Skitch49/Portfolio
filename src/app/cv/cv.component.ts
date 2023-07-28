import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
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
