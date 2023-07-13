import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { MusicComponent } from './presentation/music/music.component';
import { JeuxVideoComponent } from './presentation/jeux-video/jeux-video.component';
import { VoyageComponent } from './presentation/voyage/voyage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'presentation',
    component: PresentationComponent,
    children: [
      { path: 'music', component: MusicComponent },
      { path: 'jeux-video', component: JeuxVideoComponent },
      { path: 'voyage', component: VoyageComponent },
    ],
  },
  {
    path: 'projets',
    component: ProjectsComponent,
    children: [{ path: ':id', component: ProjectDetailsComponent }],
  },
  { path: 'contact', component: ContactComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
