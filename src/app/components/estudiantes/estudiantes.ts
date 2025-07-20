import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estudiantes as EstudiantesService, Estudiante } from '../../service/estudiantes';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Estudiantes {
  private fb = inject(FormBuilder);
  private servicio = inject(EstudiantesService);

  estudiantes = signal<Estudiante[]>([]);
  editing = signal<Estudiante | null>(null);

  form = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    cedula: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    direccion: ['', Validators.required],
    contactoEmergencia: ['', Validators.required],
  });

  constructor() {
    this.fetchEstudiantes();
  }

  fetchEstudiantes() {
    this.servicio.getAll().subscribe(data => this.estudiantes.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<Estudiante, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchEstudiantes();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchEstudiantes();
        this.form.reset();
      });
    }
  }

  edit(estudiante: Estudiante) {
    this.editing.set(estudiante);
    this.form.patchValue(estudiante);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchEstudiantes());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
