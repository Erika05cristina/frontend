import { Routes } from '@angular/router';
import { Asignaturas } from './components/asignaturas/asignaturas';
import { Calificaciones } from './components/calificaciones/calificaciones';
import { Clases } from './components/clases/clases';
import { CuentasContables } from './components/cuentas-contables/cuentas-contables';
import { ComprobantesVenta } from './components/comprobantes-venta/comprobantes-venta';
import { Docentes } from './components/docentes/docentes';
import { DiariosCaja } from './components/diarios-caja/diarios-caja';
import { EspaciosFisicos } from './components/espacios-fisicos/espacios-fisicos';
import { Estudiantes } from './components/estudiantes/estudiantes';
import { Grupos } from './components/grupos/grupos';
import { Horarios } from './components/horarios/horarios';
import { Matriculas } from './components/matriculas/matriculas';
import { ParametrosGenerales } from './components/parametros-generales/parametros-generales';
import { PerfilAccesoC } from './components/perfil-acceso-c/perfil-acceso-c';
import { PeriodoLectivoC } from './components/periodo-lectivo-c/periodo-lectivo-c';
import { PersonalAdministrativoC } from './components/personal-administrativo-c/personal-administrativo-c';
import { PlanCuentaC } from './components/plan-cuenta-c/plan-cuenta-c';
import { RubroC } from './components/rubro-c/rubro-c';
import { TransaccionFinancieraC } from './components/transaccion-financiera-c/transaccion-financiera-c';
import { HomePage } from './components/home-page/home-page';

export const routes: Routes = [
  { path: '',  component: HomePage},
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
  { path: 'perfil-acceso', component: PerfilAccesoC },
  { path: 'periodo-lectivo', component: PeriodoLectivoC},
  { path: 'personal-administrativo', component: PersonalAdministrativoC },
  { path: 'plan-cuenta', component: PlanCuentaC },
  { path: 'rubro', component: RubroC },
  { path: 'transaccion-financiera', component: TransaccionFinancieraC }
];
