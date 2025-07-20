import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Grupos as GruposService, Grupo } from '../../service/grupos';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './grupos.html',
  styleUrl: './grupos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Grupos {
  private fb = inject(FormBuilder);
  private servicio = inject(GruposService);

  grupos = signal<Grupo[]>([]);
  editing = signal<Grupo | null>(null);

  form = this.fb.group({
    nombre: ['', Validators.required],
    modalidad: ['', Validators.required],
  });

  constructor() {
    this.fetchGrupos();
  }

  fetchGrupos() {
    this.servicio.getAll().subscribe(data => this.grupos.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<Grupo, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchGrupos();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchGrupos();
        this.form.reset();
      });
    }
  }

  edit(grupo: Grupo) {
    this.editing.set(grupo);
    this.form.patchValue(grupo);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchGrupos());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
