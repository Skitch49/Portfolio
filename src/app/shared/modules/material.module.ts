import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MATERIALS = [
  MatTooltipModule,
  MatDialogModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: MATERIALS,
  exports: MATERIALS,
})
export class MaterialModule {}
