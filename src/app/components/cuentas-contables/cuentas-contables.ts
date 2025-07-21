import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PlanCuentaService, Plan } from '../../service/plan-cuenta';
import { CuentaContableService, CuentaContable } from '../../service/cuentas-contables';

@Component({
  selector: 'app-cuentas-contables',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cuentas-contables.html',
  styleUrl: './cuentas-contables.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuentasContables {
  private fb = inject(FormBuilder);
  private servicio = inject(CuentaContableService);
  private planesService = inject(PlanCuentaService);

  cuentas = signal<CuentaContable[]>([]);
  planes = signal<Plan[]>([]);
  editing = signal<CuentaContable | null>(null);

  form = this.fb.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required],
    planCuentaId: this.fb.control<number | null>(null, Validators.required)  // 🎯 Corregido aquí
  });

  constructor() {
    this.fetchCuentas();
    this.planesService.getAll().subscribe(data => this.planes.set(data));
  }

  fetchCuentas() {
    this.servicio.getAll().subscribe(data => this.cuentas.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { codigo, nombre, planCuentaId } = this.form.value;

    if (!codigo || !nombre || !planCuentaId) return;

    const payload = {
      codigo: codigo as string,
      nombre: nombre as string,
      planCuenta: { id: planCuentaId as number }
    };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, payload).subscribe(() => {
        this.fetchCuentas();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchCuentas();
        this.form.reset();
      });
    }
  }

  edit(cuenta: CuentaContable) {
    this.editing.set(cuenta);
    this.form.patchValue({
      codigo: cuenta.codigo,
      nombre: cuenta.nombre,
      planCuentaId: cuenta.planCuenta?.id ?? null
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchCuentas());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }

  getPlanNombre(id: number | undefined | null): string {
    if (!id) return '—';
    const plan = this.planes().find(p => p.id === id);
    return plan ? plan.nombre : 'Desconocido';
  }
}
