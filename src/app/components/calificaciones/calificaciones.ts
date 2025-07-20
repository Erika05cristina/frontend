import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Calificaciones as CalificacionesService, Calificacion } from '../../service/calificaciones';

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

  calificaciones = signal<Calificacion[]>([]);
  editing = signal<Calificacion | null>(null);

  form = this.fb.group({
    nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    comentario: [''],
    fechaRegistro: ['', Validators.required]
  });

  constructor() {
    this.fetchCalificaciones();
  }

  fetchCalificaciones() {
    this.servicio.getAll().subscribe(data => this.calificaciones.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<Calificacion, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchCalificaciones();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchCalificaciones();
        this.form.reset();
      });
    }
  }

  edit(calificacion: Calificacion) {
    this.editing.set(calificacion);
    this.form.patchValue(calificacion);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchCalificaciones());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
