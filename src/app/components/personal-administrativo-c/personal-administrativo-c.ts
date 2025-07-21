import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Personal, PersonalAdministrativo } from '../../service/personal-administrativo';

@Component({
  selector: 'app-personal-administrativo-c',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-administrativo-c.html',
  styleUrl: './personal-administrativo-c.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalAdministrativoC {

  private servicio = inject(PersonalAdministrativo);

  personal = signal<Personal[]>([]);
  editing = signal<Personal | null>(null);

  form = new FormGroup({
    nombres: new FormControl<string | null>(null, Validators.required),
    apellidos: new FormControl<string | null>(null, Validators.required),
    cargo: new FormControl<string | null>(null, Validators.required),
  });

  constructor() {
    this.fetchPersonal();
  }

  fetchPersonal() {
    this.servicio.getAll().subscribe(data => this.personal.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const { nombres, apellidos, cargo } = this.form.value;

    if (!nombres || !apellidos || !cargo) return;

    const payload: Omit<Personal, 'id'> = { nombres, apellidos, cargo };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update({ id, ...payload }).subscribe(() => {
        this.fetchPersonal();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchPersonal();
        this.form.reset();
      });
    }
  }

  edit(persona: Personal) {
    this.editing.set(persona);
    this.form.patchValue({
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      cargo: persona.cargo
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchPersonal());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }

}
