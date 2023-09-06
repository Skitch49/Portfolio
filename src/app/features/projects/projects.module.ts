import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ProjectsComponent } from './projects-container/projects.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RouterModule } from '@angular/router';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PROJECTS_ROUTES } from './projects.routes';
import { FormModule } from 'src/app/shared/modules/form.module';



@NgModule({
  declarations: [    
    ProjectsComponent,
    DialogComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PROJECTS_ROUTES),
    MaterialModule,
    FormModule,
  ]
})
export class ProjectsModule { }
