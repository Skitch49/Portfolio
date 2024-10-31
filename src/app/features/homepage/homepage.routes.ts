import { Routes } from "@angular/router";
import { CvComponent } from "./homepage-container/cv/cv.component";
import { HomepageComponent } from "./homepage-container/homepage.component";

export const HOMEPAGE_ROUTES: Routes = [
    { path: '', component: HomepageComponent,title:"Portfolio | Alexis Delaunay" },
  {
    path: 'cv', component: CvComponent,title:"CV | Alexis Delaunay"
  },
]