import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComprobantesVenta as ComprobantesVentaService, ComprobanteVenta } from '../../service/comprobantes-venta';
import { Estudiantes, Estudiante } from '../../service/estudiantes';
import { RubroService, RubroClass } from '../../service/rubro';

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
  private estudiantesService = inject(Estudiantes);
  private rubroService = inject(RubroService);

  estudiantes = signal<Estudiante[]>([]);
  rubros = signal<RubroClass[]>([]);
  comprobantes = signal<ComprobanteVenta[]>([]);
  editing = signal<ComprobanteVenta | null>(null);

form = this.fb.group({
  numero: this.fb.control<string>('', Validators.required),
  fechaEmision: this.fb.control<string>('', Validators.required),
  total: this.fb.control<number | null>(null, Validators.required),
  estudianteId: this.fb.control<number | null>(null, Validators.required),
  rubroIds: this.fb.control<number[] | null>([], Validators.required),
});

  constructor() {
    this.fetchComprobantes();
    this.estudiantesService.getAll().subscribe(data => this.estudiantes.set(data));
    this.rubroService.getAll().subscribe(data => this.rubros.set(data));
  }

  fetchComprobantes() {
    this.servicio.getAll().subscribe(data => this.comprobantes.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { numero, fechaEmision, total, estudianteId, rubroIds } = this.form.value;

    if (!numero || !fechaEmision || total == null || estudianteId == null) return;

    const payload = {
      numero,
      fechaEmision,
      total,
      estudiante: { id: estudianteId },
      rubros: (rubroIds || []).map(id => ({ id })),
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
      estudianteId: comprobante.estudiante.id,
      rubroIds: comprobante.rubros.map(r => r.id),
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchComprobantes());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }

  getEstudianteNombre(id: number | undefined | null): string {
    if (!id) return '—';
    const est = this.estudiantes().find(e => e.id === id);
    return est ? `${est.nombres} ${est.apellidos}` : 'Desconocido';
  }
}
