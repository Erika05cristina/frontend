import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CuentasContables as CuentasContablesService, CuentaContable } from '../../service/cuentas-contables';

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
  private servicio = inject(CuentasContablesService);

  cuentas = signal<CuentaContable[]>([]);
  editing = signal<CuentaContable | null>(null);

  form = this.fb.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required]
  });

  constructor() {
    this.fetchCuentas();
  }

  fetchCuentas() {
    this.servicio.getAll().subscribe(data => this.cuentas.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<CuentaContable, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchCuentas();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchCuentas();
        this.form.reset();
      });
    }
  }

  edit(cuenta: CuentaContable) {
    this.editing.set(cuenta);
    this.form.patchValue(cuenta);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchCuentas());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
