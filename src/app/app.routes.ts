import { Routes } from '@angular/router';
import { EspaciosFisicos } from './components/espacios-fisicos/espacios-fisicos';
import { Estudiantes } from './components/estudiantes/estudiantes';
import { Grupos } from './components/grupos/grupos';
import { Horarios } from './components/horarios/horarios';

export const routes: Routes = [
  { path: '',  redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'espacios-fisicos', component: EspaciosFisicos },
  { path: 'estudiantes', component: Estudiantes },
  { path: 'grupos', component: Grupos },
  { path: 'horarios', component: Horarios },
];
