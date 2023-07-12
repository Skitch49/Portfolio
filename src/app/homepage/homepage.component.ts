import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  astronaute: any;
  ngAfterViewInit() {
    this.astronaute = document.getElementById('astronaute');
  }

  imgSrc: string = '../../assets/images/lune.png';

  @HostListener('mousemove', ['$event']) private MouseOver(e: MouseEvent) {
    const positionX = (window.innerWidth / 2 - e.x) / 4;
    const positionY = -e.y / 5;
    this.astronaute.style.transform = `translate(${positionX}px, ${positionY}px)`;
  }
}
