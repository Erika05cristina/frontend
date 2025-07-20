import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Clases as ClasesService, Clase } from '../../service/clases';
import { Asignaturas, Asignatura } from '../../service/asignatura';

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
  private asignaturaService = inject(Asignaturas);

  clases = signal<Clase[]>([]);
  asignaturas = signal<Asignatura[]>([]);
  editing = signal<Clase | null>(null);

  form = this.fb.group<{
    aula: FormControl<string | null>;
    asignaturaId: FormControl<number | null>;
  }>({
    aula: this.fb.control('', Validators.required),
    asignaturaId: this.fb.control<number | null>(null, Validators.required)
  });

  constructor() {
    this.fetchClases();
    this.fetchAsignaturas();
  }

  fetchClases() {
    this.servicio.getAll().subscribe(data => this.clases.set(data));
  }

  fetchAsignaturas() {
    this.asignaturaService.getAll().subscribe(data => this.asignaturas.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const aula = this.form.value.aula ?? '';
    const asignaturaId = this.form.value.asignaturaId!;

    const payload = {
      aula,
      asignatura: { id: asignaturaId },
      grupo: null,
      docente: null,
      espacioFisico: null
    };  

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, payload).subscribe(() => {
        this.fetchClases();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchClases();
        this.form.reset();
      });
    }
  }

  edit(clase: Clase) {
    this.editing.set(clase);
    this.form.patchValue({
      aula: clase.aula,
      asignaturaId: clase.asignatura?.id ?? null
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchClases());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}