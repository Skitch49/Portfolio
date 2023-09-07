import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./features/homepage/homepage.module').then( m => m.HomepageModule)},
  { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then( m => m.ContactModule)},
  { path: 'projets', loadChildren: () => import('./features/projects/projects.module').then( m => m.ProjectsModule)},
  { path: 'presentation', loadChildren: () => import('./features/presentation/presentation.module').then( m => m.PresentationModule)},
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
