import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComprobantesVenta as ComprobantesVentaService, ComprobanteVenta } from '../../service/comprobantes-venta';
import { Estudiantes, Estudiante } from '../../service/estudiantes';

@Component({
  selector: 'app-comprobantes-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comprobantes-venta.html',
  styleUrl: './comprobantes-venta.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComprobantesVenta {
  private servicio = inject(ComprobantesVentaService);
  private estudiantesService = inject(Estudiantes);
  estudiantes = signal<Estudiante[]>([]);

  comprobantes = signal<ComprobanteVenta[]>([]);
  editing = signal<ComprobanteVenta | null>(null);

  form = new FormGroup({
    numero: new FormControl<string | null>(null, Validators.required),
    fechaEmision: new FormControl<string | null>(null, Validators.required),
    total: new FormControl<number | null>(null, Validators.required),
    estudianteId: new FormControl<number | null>(null, Validators.required),
  });

  constructor() {
    this.fetchComprobantes();
    this.estudiantesService.getAll().subscribe(data => this.estudiantes.set(data));
  }

  fetchComprobantes() {
    this.servicio.getAll().subscribe(data => this.comprobantes.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { numero, fechaEmision, total, estudianteId } = this.form.value;

    if (!numero || !fechaEmision || total == null || estudianteId == null) return;

    const payload = {
      numero,
      fechaEmision,
      total,
      estudiante: { id: estudianteId }
    };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, payload).subscribe(() => {
        this.fetchComprobantes();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchComprobantes();
        this.form.reset();
      });
    }
  }

  edit(comprobante: ComprobanteVenta) {
    this.editing.set(comprobante);
    this.form.patchValue({
      numero: comprobante.numero,
      fechaEmision: comprobante.fechaEmision,
      total: comprobante.total,
      estudianteId: comprobante.estudiante.id
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchComprobantes());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
