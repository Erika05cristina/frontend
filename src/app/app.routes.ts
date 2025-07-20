import { Routes } from '@angular/router';
import { EspaciosFisicos } from './components/espacios-fisicos/espacios-fisicos';
import { Estudiantes } from './components/estudiantes/estudiantes';
import { Grupos } from './components/grupos/grupos';

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
    path: 'grupos',
    component: Grupos,
  },
  {
    path: '',
    redirectTo: 'estudiantes',
    pathMatch: 'full',
  }
];
