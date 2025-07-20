import { Routes } from '@angular/router';
import { EspaciosFisicos } from './components/espacios-fisicos/espacios-fisicos';
import { Estudiantes } from './components/estudiantes/estudiantes';
import { Grupos } from './components/grupos/grupos';
import { Horarios } from './components/horarios/horarios';
import { Matriculas } from './components/matriculas/matriculas';
import { ParametrosGenerales } from './components/parametros-generales/parametros-generales';
import { Asignaturas } from './components/asignaturas/asignaturas';

export const routes: Routes = [
  { path: '',  redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'asignaturas', component: Asignaturas },
  { path: 'espacios-fisicos', component: EspaciosFisicos },
  { path: 'estudiantes', component: Estudiantes },
  { path: 'grupos', component: Grupos },
  { path: 'horarios', component: Horarios },
  { path: 'matriculas', component: Matriculas },
  { path: 'parametros-generales', component: ParametrosGenerales },
];
