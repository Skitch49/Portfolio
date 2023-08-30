import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const MATERIALS = [
  MatTooltipModule,
  MatDialogModule,
  MatButtonModule
]

@NgModule({
  imports: MATERIALS,
  exports: MATERIALS,
})
export class MaterialModule { }
