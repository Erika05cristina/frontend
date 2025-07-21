import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Plan, PlanCuentaService } from '../../service/plan-cuenta';

@Component({
  selector: 'app-plan-cuenta-c',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './plan-cuenta-c.html',
  styleUrl: './plan-cuenta-c.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCuentaC {

  private servicio = inject(PlanCuentaService);

  planes = signal<Plan[]>([]);
  editing = signal<Plan | null>(null);

  form = new FormGroup({
    nombre: new FormControl<string | null>(null, Validators.required),
    descripcion: new FormControl<string | null>(null, Validators.required),
  });

  constructor() {
    this.fetchPlanes();
  }

  fetchPlanes() {
    this.servicio.getAll().subscribe(data => this.planes.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { nombre, descripcion } = this.form.value;

    if (!nombre || !descripcion) return;

    const payload: Omit<Plan, 'id'> = { nombre, descripcion };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update({ id, ...payload }).subscribe(() => {
        this.fetchPlanes();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchPlanes();
        this.form.reset();
      });
    }
  }

  edit(plan: Plan) {
    this.editing.set(plan);
    this.form.patchValue({
      nombre: plan.nombre,
      descripcion: plan.descripcion
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchPlanes());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
