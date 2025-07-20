import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EspaciosFisicos as EspaciosFisicosService, EspacioFisico } from '../../service/espacios-fisicos';

@Component({
  selector: 'app-espacios-fisicos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './espacios-fisicos.html',
  styleUrl: './espacios-fisicos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EspaciosFisicos {
  private fb = inject(FormBuilder);
  private servicio = inject(EspaciosFisicosService);

  espacios = signal<EspacioFisico[]>([]);
  editing = signal<EspacioFisico | null>(null);

  form = this.fb.group({
    nombre: ['', Validators.required],
    capacidad: [0, [Validators.required, Validators.min(1)]],
    ubicacion: ['', Validators.required],
  });

  constructor() {
    this.fetchEspacios();
  }

  fetchEspacios() {
    this.servicio.getAll().subscribe(data => this.espacios.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<EspacioFisico, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchEspacios();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchEspacios();
        this.form.reset();
      });
    }
  }

  edit(espacio: EspacioFisico) {
    this.editing.set(espacio);
    this.form.patchValue(espacio);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchEspacios());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
