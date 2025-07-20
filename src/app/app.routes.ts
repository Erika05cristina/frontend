import { Routes } from '@angular/router';
import { EspaciosFisicos } from './component/espacios-fisicos/espacios-fisicos';
export const routes: Routes = [
  {
    path: 'espacios-fisicos',
    component: EspaciosFisicos,
  },
  {
    path: '',
    redirectTo: 'espacios-fisicos',
    pathMatch: 'full',
  }
];
