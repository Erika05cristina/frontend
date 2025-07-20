import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Matriculas as MatriculasService, Matricula } from '../../service/matriculas';
import { Estudiantes, Estudiante } from '../../service/estudiantes';

@Component({
  selector: 'app-matriculas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './matriculas.html',
  styleUrl: './matriculas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Matriculas {
  private servicio = inject(MatriculasService);
  private estudiantesService = inject(Estudiantes);

  estudiantes = signal<Estudiante[]>([]);
  matriculas = signal<Matricula[]>([]);
  editing = signal<Matricula | null>(null);

  form = new FormGroup({
    fecha: new FormControl<string | null>(null, Validators.required),
    estudianteId: new FormControl<number | null>(null, Validators.required),
  });

  constructor() {
    this.fetchMatriculas();
    this.estudiantesService.getAll().subscribe(data => this.estudiantes.set(data));
  }

  fetchMatriculas() {
    this.servicio.getAll().subscribe(data => this.matriculas.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { fecha, estudianteId } = this.form.value;

    if (!fecha || estudianteId == null) return;

    const payload: Omit<Matricula, 'id'> = {
      fecha,
      estudiante: { id: estudianteId }
    };

    console.log('Payload enviado:', payload);

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, payload).subscribe(() => {
        this.fetchMatriculas();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchMatriculas();
        this.form.reset();
      });
    }
  }

  edit(matricula: Matricula) {
    this.editing.set(matricula);
    this.form.patchValue({
      fecha: matricula.fecha,
      estudianteId: matricula.estudiante?.id ?? null
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchMatriculas());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }

  getEstudianteNombre(id: number | undefined | null): string {
    if (!id) return '—';
    const estudiante = this.estudiantes().find(e => e.id === id);
    return estudiante ? `${estudiante.nombres} ${estudiante.apellidos}` : 'Desconocido';
  }
}