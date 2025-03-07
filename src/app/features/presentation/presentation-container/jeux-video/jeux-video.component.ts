import {

  Component,

} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-jeux-video',
  templateUrl: './jeux-video.component.html',
  styleUrls: ['./jeux-video.component.scss'],
  animations: [
    trigger('transition', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate(
          '500ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class JeuxVideoComponent  {
 
  
}
