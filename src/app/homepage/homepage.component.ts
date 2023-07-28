import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {

  constructor(private router: Router) {}

  planet: boolean;
  astronaute: any;
  ngOnInit() {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    if (window.innerWidth > 1200) {
      this.planet = true;
    } else {
      this.planet = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth();
  }

  ngAfterViewInit() {
    this.astronaute = document.getElementById('astronaute');
  }

  imgSrc: string = '../../assets/images/lune.png';

  @HostListener('mousemove', ['$event']) private MouseOver(e: MouseEvent) {
    const positionX = (window.innerWidth / 2 - e.x) / 4;
    const positionY = -e.y / 5;
    this.astronaute.style.transform = `translate(${positionX}px, ${positionY}px)`;
  }

  addRotationAnimation(event: MouseEvent) {
    const target = event.target as HTMLElement;
    target.classList.add('rotate-animation');
    setTimeout(() => this.removeRotationAnimation(target), 751);
  }

  removeRotationAnimation(target: HTMLElement) {
    target.classList.remove('rotate-animation');
  }

  navigateToExternalLink(link: string) {
    window.open(link, '_blank'); // Ouvre le lien dans un nouvel onglet
  }
}
