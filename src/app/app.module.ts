import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { MusicComponent } from './presentation/music/music.component';
import { JeuxVideoComponent } from './presentation/jeux-video/jeux-video.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { VoyageComponent } from './presentation/voyage/voyage.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CvComponent } from './cv/cv.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    PresentationComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    NotFoundComponent,
    ContactComponent,
    MusicComponent,
    JeuxVideoComponent,
    FilterPipe,
    VoyageComponent,
    CvComponent,
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule,ReactiveFormsModule,GoogleMapsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
