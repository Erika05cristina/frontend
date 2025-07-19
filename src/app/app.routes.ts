import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'estudiantes',
    loadChildren: () => import('../app/features/estudiantes/routes').then(m => m.estudianteRoutes)
  },
//   {
//     path: 'grupos',
//     loadChildren: () => import('./grupos/routes').then(m => m.grupoRoutes)
//   },
//   {
//     path: 'horarios',
//     loadChildren: () => import('./horarios/routes').then(m => m.horarioRoutes)
//   },
//   {
//     path: 'matriculas',
//     loadChildren: () => import('./matriculas/routes').then(m => m.matriculaRoutes)
//   },
//   { path: '', redirectTo: '/estudiantes', pathMatch: 'full' },
];
