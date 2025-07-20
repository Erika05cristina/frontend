import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Matriculas as MatriculasService, Matricula } from '../../service/matriculas';

@Component({
  selector: 'app-matriculas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './matriculas.html',
  styleUrl: './matriculas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Matriculas {
  private fb = inject(FormBuilder);
  private servicio = inject(MatriculasService);

  matriculas = signal<Matricula[]>([]);
  editing = signal<Matricula | null>(null);

  form = this.fb.group({
    fecha: ['', Validators.required],
  });

  constructor() {
    this.fetchMatriculas();
  }

  fetchMatriculas() {
    this.servicio.getAll().subscribe(data => this.matriculas.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<Matricula, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchMatriculas();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchMatriculas();
        this.form.reset();
      });
    }
  }

  edit(matricula: Matricula) {
    this.editing.set(matricula);
    this.form.patchValue(matricula);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchMatriculas());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
