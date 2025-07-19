import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { EstudianteService, Estudiante } from '../estudiantes/estudiante.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiante-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>{{ editando() ? 'Editar' : 'Nuevo' }} Estudiante</h2>
    <form [formGroup]="form" (ngSubmit)="guardar()">
      <label>
        Nombres:
        <input formControlName="nombres">
      </label>
      <label>
        Apellidos:
        <input formControlName="apellidos">
      </label>
      <label>
        Cédula:
        <input formControlName="cedula">
      </label>
      <label>
        Fecha de Nacimiento:
        <input type="date" formControlName="fechaNacimiento">
      </label>
      <button type="submit" [disabled]="form.invalid">Guardar</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EstudianteFormComponent implements OnInit {
  private readonly estudianteService = inject(EstudianteService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    cedula: ['', Validators.required],
    fechaNacimiento: ['', Validators.required]
  });

  readonly editando = signal(false);
  private estudianteId: number | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando.set(true);
      this.estudianteId = +id;
      this.estudianteService.get(this.estudianteId).subscribe(est => this.form.patchValue(est));
    }
  }

  guardar() {
    const value = this.form.value as Estudiante;
    const request = this.editando() && this.estudianteId
      ? this.estudianteService.update(this.estudianteId, value)
      : this.estudianteService.create(value);

    request.subscribe(() => this.router.navigate(['/estudiantes']));
  }
}
