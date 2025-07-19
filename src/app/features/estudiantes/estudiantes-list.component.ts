import { Component, ChangeDetectionStrategy, computed, signal, inject, OnInit } from '@angular/core';
import { EstudianteService, Estudiante } from '../estudiantes/estudiante.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-estudiante-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Estudiantes</h2>
    <button [routerLink]="['/estudiantes/nuevo']">Nuevo</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Cédula</th>
          <th>Fecha de Nacimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        @for(estudiante of estudiantes(); track estudiante.id) {
          <tr>
            <td>{{ estudiante.id }}</td>
            <td>{{ estudiante.nombres }}</td>
            <td>{{ estudiante.apellidos }}</td>
            <td>{{ estudiante.cedula }}</td>
            <td>{{ estudiante.fechaNacimiento }}</td>
            <td>
              <button [routerLink]="['/estudiantes/editar', estudiante.id]">Editar</button>
              <button (click)="eliminar(estudiante.id!)">Eliminar</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EstudianteListComponent implements OnInit {
  private readonly estudianteService = inject(EstudianteService);
  private readonly router = inject(Router);

  readonly estudiantes = signal<Estudiante[]>([]);

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.estudianteService.list().subscribe(data => this.estudiantes.set(data));
  }

  eliminar(id: number) {
    this.estudianteService.remove(id).subscribe(() => this.cargar());
  }
}
