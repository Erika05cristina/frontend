import { Routes } from '@angular/router';
import { EspaciosFisicos } from './components/espacios-fisicos/espacios-fisicos';
import { Estudiantes } from './components/estudiantes/estudiantes';
export const routes: Routes = [
  {
    path: 'espacios-fisicos',
    component: EspaciosFisicos,
  },
    {
    path: 'estudiantes',
    component: Estudiantes,
  },
  {
    path: '',
    redirectTo: 'estudiantes',
    pathMatch: 'full',
  }
];
