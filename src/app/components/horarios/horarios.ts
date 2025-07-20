import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horarios as HorariosService, Horario } from '../../service/horarios';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './horarios.html',
  styleUrl: './horarios.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Horarios {
  private fb = inject(FormBuilder);
  private servicio = inject(HorariosService);

  horarios = signal<Horario[]>([]);
  editing = signal<Horario | null>(null);

  form = this.fb.group({
    diaSemana: ['', Validators.required],
    horaInicio: ['', Validators.required],
    horaFin: ['', Validators.required],
  });

  constructor() {
    this.fetchHorarios();
  }

  fetchHorarios() {
    this.servicio.getAll().subscribe(data => this.horarios.set(data));
  }

  submit() {
    if (this.form.invalid) return;
    const formValue = this.form.value as Omit<Horario, 'id'>;

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, formValue).subscribe(() => {
        this.fetchHorarios();
        this.cancel();
      });
    } else {
      this.servicio.create(formValue).subscribe(() => {
        this.fetchHorarios();
        this.form.reset();
      });
    }
  }

  edit(horario: Horario) {
    this.editing.set(horario);
    this.form.patchValue(horario);
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchHorarios());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}