import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Asignaturas as AsignaturasService, Asignatura } from '../../service/asignatura';

@Component({
  selector: 'app-asignaturas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asignaturas.html',
  styleUrl: './asignaturas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Asignaturas {
  private fb = inject(FormBuilder);
  private servicio = inject(AsignaturasService);

  asignaturas = signal<Asignatura[]>([]);
  editing = signal<Asignatura | null>(null);

  form = this.fb.group({
    nombre: ['', Validators.required],
    nivel: ['', Validators.required],
    descripcion: [''],
  });

  constructor() {
    this.fetchAsignaturas();
  }

  fetchAsignaturas() {
    this.servicio.getAll().subscribe(data => this.asignaturas.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<Asignatura, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchAsignaturas();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchAsignaturas();
        this.form.reset();
      });
    }
  }

  edit(asignatura: Asignatura) {
    this.editing.set(asignatura);
    this.form.patchValue(asignatura);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchAsignaturas());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
