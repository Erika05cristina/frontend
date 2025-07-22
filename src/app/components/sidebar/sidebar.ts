import { Component, ElementRef, ViewChild, AfterViewInit, HostListener,signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})

export class Sidebar implements AfterViewInit {
  @ViewChild('sidebar') sidebarRef!: ElementRef<HTMLElement>;
  @ViewChild('menuIcon') menuIconRef!: ElementRef<HTMLElement>;

  private readonly collapsedSidebarHeight = '56px';
  private readonly fullSidebarHeight = 'calc(100vh - 32px)';
  readonly isMenuActive = signal(false);

readonly primaryNav = [
  { icon: 'menu_book', label: 'Asignaturas', route: '/asignaturas' },
  { icon: 'leaderboard', label: 'Calificaciones', route: '/calificaciones' },
  { icon: 'school', label: 'Clases', route: '/clases' },
  { icon: 'checkbook', label: 'Comprobantes', route: '/comprobantes-venta' },
  { icon: 'finance_chip', label: 'Cuentas Contables', route: '/cuentas-contables' },
  { icon: 'receipt', label: 'Diarios', route: '/diarios-caja' },
  { icon: 'school', label: 'Docentes', route: '/docentes' },
  { icon: 'location_city', label: 'Espacios Físicos', route: '/espacios-fisicos' },
  { icon: 'group', label: 'Estudiantes', route: '/estudiantes' },
  { icon: 'diversity_3', label: 'Grupos', route: '/grupos' },
  { icon: 'event', label: 'Horarios', route: '/horarios' },
  { icon: 'how_to_reg', label: 'Matriculas', route: '/matriculas' },
  { icon: 'tune', label: 'Parámetros Generales', route: '/parametros-generales' },
  { icon: 'event_note', label: 'Periodo Lectivo', route: '/periodo-lectivo' },
  { icon: 'account_tree', label: 'Plan de Cuenta', route: '/plan-cuenta' },
  { icon: 'category', label: 'Rubro', route: '/rubro' },
  { icon: 'attach_money', label: 'Transacción Financiera', route: '/transaccion-financiera' }
];

  ngAfterViewInit(): void {
    this.sidebarRef.nativeElement.classList.add('collapsed');
    this.updateSidebarHeight();
  }

  toggleCollapsed(): void {
    this.sidebarRef.nativeElement.classList.toggle('collapsed');
  }

  toggleMenu(): void {
    this.isMenuActive.update((active) => {
      const next = !active;
      this.adjustSidebar(next);
      return next;
    });
  }

  @HostListener('window:resize')
  updateSidebarHeight(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const sidebar = this.sidebarRef.nativeElement;
    const isWideScreen = window.innerWidth >= 1024;

    if (isWideScreen) {
      sidebar.style.height = this.fullSidebarHeight;
    } else {
      sidebar.classList.remove('collapsed');
      sidebar.style.height = 'auto';
      this.adjustSidebar(this.isMenuActive());
    }
  }


  private adjustSidebar(active: boolean): void {
    const sidebar = this.sidebarRef.nativeElement;
    const icon = this.menuIconRef.nativeElement;

    sidebar.style.height = active ? `${sidebar.scrollHeight}px` : this.collapsedSidebarHeight;
    icon.innerText = active ? 'close' : 'menu';
  }
}