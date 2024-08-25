import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    // trigger("title", [
    //   transition(":enter", query("h1, h2, p, span", [
    //     style({
    //       opacity: 0,
    //       transform: 'translateX(-10px)'
    //     }),
    //     stagger(400, animate('800ms 500ms'))
    //   ]))
    // ]),

    trigger('container', [
      transition(':enter', [
        query('.sectionWave', [
          style({
            opacity: 0,
            transform: 'translateY(200px)',
          }),
          animate('1000ms 600ms'),
        ]),
      ]),
    ]),
  ],
})
export class HomepageComponent implements AfterViewInit, OnInit {
  isLoggedIn: boolean = false;

  constructor() {}

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
    window.open(link, '_blank');
  }
}
