import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Perfil, PerfilAcceso } from '../../service/perfil-acceso';

@Component({
  selector: 'app-perfil-acceso-c',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-acceso-c.html',
  styleUrl: './perfil-acceso-c.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilAccesoC {

  private servicio = inject(PerfilAcceso)
  perfiles = signal<Perfil[]>([]);
  editing = signal<Perfil | null>(null);

  form = new FormGroup({
    nombre: new FormControl<string | null>(null, Validators.required),
    descripcion: new FormControl<string | null>(null, Validators.required),
  });

  constructor() {
    this.fetchPerfiles();
  }

  fetchPerfiles() {
    this.servicio.getAll().subscribe(data => this.perfiles.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { nombre, descripcion } = this.form.value;

    if (!nombre || !descripcion) return;

    const payload: Omit<Perfil, 'id'> = { nombre, descripcion };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update({ id, ...payload }).subscribe(() => {
        this.fetchPerfiles();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchPerfiles();
        this.form.reset();
      });
    }
  }

  edit(perfil: Perfil) {
    this.editing.set(perfil);
    this.form.patchValue({
      nombre: perfil.nombre,
      descripcion: perfil.descripcion
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchPerfiles());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}
