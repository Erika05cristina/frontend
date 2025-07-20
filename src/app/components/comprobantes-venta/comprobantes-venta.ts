import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComprobantesVenta as ComprobantesVentaService, ComprobanteVenta } from '../../service/comprobantes-venta';

@Component({
  selector: 'app-comprobantes-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comprobantes-venta.html',
  styleUrl: './comprobantes-venta.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComprobantesVenta {
  private fb = inject(FormBuilder);
  private servicio = inject(ComprobantesVentaService);

  comprobantes = signal<ComprobanteVenta[]>([]);
  editing = signal<ComprobanteVenta | null>(null);

  form = this.fb.group({
    numero: ['', Validators.required],
    fechaEmision: ['', Validators.required],
    total: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    this.fetchComprobantes();
  }

  fetchComprobantes() {
    this.servicio.getAll().subscribe(data => this.comprobantes.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<ComprobanteVenta, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchComprobantes();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchComprobantes();
        this.form.reset();
      });
    }
  }

  edit(comprobante: ComprobanteVenta) {
    this.editing.set(comprobante);
    this.form.patchValue(comprobante);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchComprobantes());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
