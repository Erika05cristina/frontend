import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Calificaciones as CalificacionesService, Calificacion } from '../../service/calificaciones';
import { Estudiantes, Estudiante } from '../../service/estudiantes';
import { Asignaturas, Asignatura } from '../../service/asignatura';
import { Clases as ClasesService, Clase } from '../../service/clases';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calificaciones.html',
  styleUrl: './calificaciones.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calificaciones {
  private fb = inject(FormBuilder);
  private servicio = inject(CalificacionesService);
  private estudianteService = inject(Estudiantes);
  private asignaturaService = inject(Asignaturas);
  private claseService = inject(ClasesService);

  calificaciones = signal<Calificacion[]>([]);
  estudiantes = signal<Estudiante[]>([]);
  asignaturas = signal<Asignatura[]>([]);
  clases = signal<Clase[]>([]);
  editing = signal<Calificacion | null>(null);

  form = this.fb.group<{
    nota: FormControl<number | null>;
    comentario: FormControl<string | null>;
    fechaRegistro: FormControl<string | null>;
    estudianteId: FormControl<number | null>;
    asignaturaId: FormControl<number | null>;
    claseId: FormControl<number | null>;
  }>({
    nota: this.fb.control(0, [Validators.required, Validators.min(0), Validators.max(10)]),
    comentario: this.fb.control(''),
    fechaRegistro: this.fb.control('', Validators.required),
    estudianteId: this.fb.control<number | null>(null, Validators.required),
    asignaturaId: this.fb.control<number | null>(null, Validators.required),
    claseId: this.fb.control<number | null>(null, Validators.required)
  });

  constructor() {
    this.fetchCalificaciones();
    this.fetchEstudiantes();
    this.fetchAsignaturas();
    this.fetchClases();
  }

  fetchCalificaciones() {
    this.servicio.getAll().subscribe(data => this.calificaciones.set(data));
  }

  fetchEstudiantes() {
    this.estudianteService.getAll().subscribe(data => this.estudiantes.set(data));
  }

  fetchAsignaturas() {
    this.asignaturaService.getAll().subscribe(data => this.asignaturas.set(data));
  }

  fetchClases() {
    this.claseService.getAll().subscribe(data => this.clases.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const nota = this.form.value.nota!;
    const comentario = this.form.value.comentario ?? '';
    const fechaRegistro = this.form.value.fechaRegistro!;
    const estudianteId = this.form.value.estudianteId!;
    const asignaturaId = this.form.value.asignaturaId!;
    const claseId = this.form.value.claseId!;

    const payload = {
      nota,
      comentario,
      fechaRegistro,
      estudiante: { id: estudianteId },
      asignatura: { id: asignaturaId },
      clase: { id: claseId }
    };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, payload).subscribe(() => {
        this.fetchCalificaciones();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchCalificaciones();
        this.form.reset();
      });
    }
  }

  edit(calificacion: Calificacion) {
    this.editing.set(calificacion);
    this.form.patchValue({
      nota: calificacion.nota,
      comentario: calificacion.comentario,
      fechaRegistro: calificacion.fechaRegistro,
      estudianteId: calificacion.estudiante?.id ?? null,
      asignaturaId: calificacion.asignatura?.id ?? null,
      claseId: calificacion.clase?.id ?? null
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchCalificaciones());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}