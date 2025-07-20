import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiariosCaja as DiariosCajaService, DiarioCaja } from '../../service/diarios-caja';

@Component({
  selector: 'app-diarios-caja',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './diarios-caja.html',
  styleUrl: './diarios-caja.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiariosCaja {
  private fb = inject(FormBuilder);
  private servicio = inject(DiariosCajaService);

  diarios = signal<DiarioCaja[]>([]);
  editing = signal<DiarioCaja | null>(null);

  form = this.fb.group({
    fecha: ['', Validators.required]
  });

  constructor() {
    this.fetchDiarios();
  }

  fetchDiarios() {
    this.servicio.getAll().subscribe(data => this.diarios.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<DiarioCaja, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchDiarios();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchDiarios();
        this.form.reset();
      });
    }
  }

  edit(diario: DiarioCaja) {
    this.editing.set(diario);
    this.form.patchValue(diario);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchDiarios());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
