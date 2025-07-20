import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Docentes as DocentesService, Docente } from '../../service/docentes';

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './docentes.html',
  styleUrl: './docentes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Docentes {
  private fb = inject(FormBuilder);
  private servicio = inject(DocentesService);

  docentes = signal<Docente[]>([]);
  editing = signal<Docente | null>(null);

  form = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    especialidad: ['']
  });

  constructor() {
    this.fetchDocentes();
  }

  fetchDocentes() {
    this.servicio.getAll().subscribe(data => this.docentes.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<Docente, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchDocentes();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchDocentes();
        this.form.reset();
      });
    }
  }

  edit(docente: Docente) {
    this.editing.set(docente);
    this.form.patchValue(docente);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchDocentes());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
