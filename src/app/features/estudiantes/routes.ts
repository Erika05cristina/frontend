import { Routes } from '@angular/router';
import { EstudianteListComponent } from '../estudiantes/estudiantes-list.component';
import { EstudianteFormComponent } from '../estudiantes/estudiantes-form.component';

export const estudianteRoutes: Routes = [
  { path: '', component: EstudianteListComponent },
  { path: 'nuevo', component: EstudianteFormComponent },
  { path: 'editar/:id', component: EstudianteFormComponent }
];
