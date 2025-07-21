import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Periodo, PeriodoLectivo } from '../../service/periodo-lectivo';

@Component({
  selector: 'app-periodo-lectivo-c',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './periodo-lectivo-c.html',
  styleUrl: './periodo-lectivo-c.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodoLectivoC {

  private servicio = inject(PeriodoLectivo);

  periodos = signal<Periodo[]>([]);
  editing = signal<Periodo | null>(null);

  form = new FormGroup({
    nombre: new FormControl<string | null>(null, Validators.required),
    fechaInicio: new FormControl<string | null>(null, Validators.required),
    fechaFin: new FormControl<string | null>(null, Validators.required),
  });

  constructor() {
    this.fetchPeriodos();
  }

  fetchPeriodos() {
    this.servicio.getAll().subscribe(data => this.periodos.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { nombre, fechaInicio, fechaFin } = this.form.value;

    if (!nombre || !fechaInicio || !fechaFin) return;

    const payload: Omit<Periodo, 'id'> = {
      nombre,
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
    };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update({ id, ...payload }).subscribe(() => {
        this.fetchPeriodos();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchPeriodos();
        this.form.reset();
      });
    }
  }

  edit(periodo: Periodo) {
    this.editing.set(periodo);
    this.form.patchValue({
      nombre: periodo.nombre,
      fechaInicio: this.formatDate(periodo.fechaInicio),
      fechaFin: this.formatDate(periodo.fechaFin),
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchPeriodos());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }

  private formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }
}
