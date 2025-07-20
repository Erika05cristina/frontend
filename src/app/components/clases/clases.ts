import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Clases as ClasesService, Clase } from '../../service/clases';

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clases.html',
  styleUrl: './clases.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clases {
  private fb = inject(FormBuilder);
  private servicio = inject(ClasesService);

  clases = signal<Clase[]>([]);
  editing = signal<Clase | null>(null);

  form = this.fb.group({
    aula: ['', Validators.required],
  });

  constructor() {
    this.fetchClases();
  }

  fetchClases() {
    this.servicio.getAll().subscribe(data => this.clases.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<Clase, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchClases();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchClases();
        this.form.reset();
      });
    }
  }

  edit(clase: Clase) {
    this.editing.set(clase);
    this.form.patchValue(clase);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchClases());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
