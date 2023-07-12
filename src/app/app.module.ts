import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './shared/pipes/filter.pipe';

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
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
