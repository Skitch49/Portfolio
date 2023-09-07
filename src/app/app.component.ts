import { Component } from '@angular/core';
import { MetaAndTitleService } from './shared/services/meta-and-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private metaAndTitle: MetaAndTitleService // do not delete
    ) { }
}
