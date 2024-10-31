import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JeuxVideoComponent } from './presentation-container/jeux-video/jeux-video.component';
import { MusicComponent } from './presentation-container/music/music.component';
import { PresentationComponent } from './presentation-container/presentation.component';
import { VoyageComponent } from './presentation-container/voyage/voyage.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PRESENTATION_ROUTES } from './presentation.routes';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { FormModule } from 'src/app/shared/modules/form.module';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MinuteToHourPipe } from 'src/app/shared/pipes/minute-to-hour.pipe';


@NgModule({
  declarations: [
    PresentationComponent,
    MusicComponent,
    JeuxVideoComponent,
    VoyageComponent,
    MinuteToHourPipe,
  ],
  imports: [
    CommonModule,
    FormModule,
    GoogleMapsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    RouterModule.forChild(PRESENTATION_ROUTES),
  ]
})
export class PresentationModule { }
