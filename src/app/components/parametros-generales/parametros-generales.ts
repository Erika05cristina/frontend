import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParametrosGenerales as ParametrosGeneralesService, ParametroGeneral } from '../../service/parametros-generales';

@Component({
  selector: 'app-parametros-generales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parametros-generales.html',
  styleUrl: './parametros-generales.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParametrosGenerales {
  private fb = inject(FormBuilder);
  private servicio = inject(ParametrosGeneralesService);

  parametros = signal<ParametroGeneral[]>([]);
  editing = signal<ParametroGeneral | null>(null);

  form = this.fb.group({
    nombre: ['', Validators.required],
    valor: ['', Validators.required],
  });

  constructor() {
    this.fetchParametros();
  }

  fetchParametros() {
    this.servicio.getAll().subscribe(data => this.parametros.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<ParametroGeneral, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchParametros();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchParametros();
        this.form.reset();
      });
    }
  }

  edit(parametro: ParametroGeneral) {
    this.editing.set(parametro);
    this.form.patchValue(parametro);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchParametros());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
