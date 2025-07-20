import { Routes } from '@angular/router';
import { Asignaturas } from './components/asignaturas/asignaturas';
import { Calificaciones } from './components/calificaciones/calificaciones';
import { Clases } from './components/clases/clases';
import { CuentasContables } from './components/cuentas-contables/cuentas-contables';
import { ComprobantesVenta } from './service/comprobantes-venta';
import { Docentes } from './components/docentes/docentes';
import { DiariosCaja } from './components/diarios-caja/diarios-caja';
import { EspaciosFisicos } from './components/espacios-fisicos/espacios-fisicos';
import { Estudiantes } from './components/estudiantes/estudiantes';
import { Grupos } from './components/grupos/grupos';
import { Horarios } from './components/horarios/horarios';
import { Matriculas } from './components/matriculas/matriculas';
import { ParametrosGenerales } from './components/parametros-generales/parametros-generales';

export const routes: Routes = [
  { path: '',  redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'asignaturas', component: Asignaturas },
  { path: 'calificaciones', component: Calificaciones },
  { path: 'clases', component: Clases },
  { path: 'comprobantes-venta', component: ComprobantesVenta },
  { path: 'cuentas-contables', component: CuentasContables },
  { path: 'diarios-caja', component: DiariosCaja },
  { path: 'docentes', component: Docentes },
  { path: 'espacios-fisicos', component: EspaciosFisicos },
  { path: 'estudiantes', component: Estudiantes },
  { path: 'grupos', component: Grupos },
  { path: 'horarios', component: Horarios },
  { path: 'matriculas', component: Matriculas },
  { path: 'parametros-generales', component: ParametrosGenerales },
];
