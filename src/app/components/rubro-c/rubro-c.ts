import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RubroClass, RubroService } from '../../service/rubro';

@Component({
  selector: 'app-rubro-c',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rubro-c.html',
  styleUrl: './rubro-c.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RubroC {

  private servicio = inject(RubroService)

  rubros = signal<RubroClass[]>([]);
  editing = signal<RubroClass | null>(null);

  form = new FormGroup({
    descripcion: new FormControl<string | null>(null, Validators.required),
    monto: new FormControl<number | null>(null, Validators.required),
  });

  constructor() {
    this.fetchRubros();
  }

  fetchRubros() {
    this.servicio.getAll().subscribe(data => this.rubros.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { descripcion, monto } = this.form.value;

    if (!descripcion || monto == null) return;

    const payload: Omit<RubroClass, 'id'> = { descripcion, monto };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update({ id, ...payload }).subscribe(() => {
        this.fetchRubros();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchRubros();
        this.form.reset();
      });
    }
  }

  edit(rubro: RubroClass) {
    this.editing.set(rubro);
    this.form.patchValue({
      descripcion: rubro.descripcion,
      monto: rubro.monto
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchRubros());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
