import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaccion, TransaccionFinanciera } from '../../service/transaccion-financiera';

@Component({
  selector: 'app-transaccion-financiera-c',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaccion-financiera-c.html',
  styleUrl: './transaccion-financiera-c.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransaccionFinancieraC {

  private servicio = inject(TransaccionFinanciera);

  transacciones = signal<Transaccion[]>([]);
  editing = signal<Transaccion | null>(null);

  form = new FormGroup({
    tipo: new FormControl<string | null>(null, Validators.required),
    descripcion: new FormControl<string | null>(null, Validators.required),
    monto: new FormControl<number | null>(null, Validators.required),
    fecha: new FormControl<string | null>(null, Validators.required),
  });

  constructor() {
    this.fetchTransacciones();
  }

  fetchTransacciones() {
    this.servicio.getAll().subscribe(data => this.transacciones.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { tipo, descripcion, monto, fecha } = this.form.value;

    if (!tipo || !descripcion || monto == null || !fecha) return;

    const payload: Omit<Transaccion, 'id'> = { tipo, descripcion, monto, fecha };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update({ id, ...payload }).subscribe(() => {
        this.fetchTransacciones();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchTransacciones();
        this.form.reset();
      });
    }
  }

  edit(transaccion: Transaccion) {
    this.editing.set(transaccion);
    this.form.patchValue({
      tipo: transaccion.tipo,
      descripcion: transaccion.descripcion,
      monto: transaccion.monto,
      fecha: transaccion.fecha,
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchTransacciones());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
