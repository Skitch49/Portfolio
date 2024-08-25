import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent implements AfterViewInit {
  ngAfterViewInit() {
    let i = 0;
    let y = 0;
    let z = 0;

<<<<<<< HEAD
    const date1 = new Date('2001-01-16');
    const date2 = new Date();
    const age = date2.getFullYear() - date1.getFullYear();

    let text1 = `Salut, je suis Alexis, j'ai ${age} ans et je suis actuellement en 2ème année de Master Développeur Full Stack à MyDigitalSchool situé à Angers pour aquérir le plus de connaissance possible afin d'en faire mon métier.`;
=======
    let text1 = `Salut, je suis Alexis, j'ai 23 ans et je suis actuellement en 2ème année de Master Développeur Full Stack à MyDigitalSchool situé à Angers pour aquérir le plus de connaissance possible afin d'en faire mon métier.`;
>>>>>>> 3e1f856dca26de6ed9b2004ed81aa84cce411cda
    let text2 = `J'aime le fait d'avoir la possibilité de pouvoir créer sans limite et apprendre à maitriser de nouvelles technologies.`;
    let text3 = `Fan d'astronomie & de rap fr (surtout Vald), toujours partant pour sortir boire un verre 😄`;
    function Saisie() {
      try {
        setTimeout(function typing() {
          if (i < text1.length) {
            document.querySelector('#saisie1').innerHTML += text1.charAt(i);
            i++;
            setTimeout(typing, 25);
          }
          if (i === text1.length) {
            if (y < text2.length) {
              document.querySelector('#saisie2').innerHTML += text2.charAt(y);
              y++;
              setTimeout(typing, 50);
            }
          }
          if (y === text2.length) {
            if (z < text3.length) {
              document.querySelector('#saisie3').innerHTML += text3.charAt(z);
              z++;
              setTimeout(typing, 80);
            }
          }
        }, 500);
      } catch (error) {
        throw new Error(error);
      }
    }
    Saisie();
  }
}
