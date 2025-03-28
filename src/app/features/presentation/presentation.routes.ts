import { Routes } from "@angular/router";
import { JeuxVideoComponent } from "./presentation-container/jeux-video/jeux-video.component";
import { MusicComponent } from "./presentation-container/music/music.component";
import { PresentationComponent } from "./presentation-container/presentation.component";
import { VoyageComponent } from "./presentation-container/voyage/voyage.component";

export const PRESENTATION_ROUTES: Routes = [
    {
        path: '',
        component: PresentationComponent,title:"Présentation | Alexis Delaunay",
        children: [
          { path: 'music', component: MusicComponent,title:"Musique | Alexis Delaunay" },
          { path: 'jeux-video', component: JeuxVideoComponent,title:"Jeux Vidéo | Alexis Delaunay" },
          { path: 'voyage', component: VoyageComponent,title:"Voyage | Alexis Delaunay" },
        ],
      },
]