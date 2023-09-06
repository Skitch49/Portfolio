import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvComponent } from './homepage-container/cv/cv.component';
import { HomepageComponent } from './homepage-container/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HOMEPAGE_ROUTES } from './homepage.routes';



@NgModule({
  declarations: [
    CvComponent,
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOMEPAGE_ROUTES),
  ]
})
export class HomepageModule { }
