import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Clases as ClasesService, Clase } from '../../service/clases';
import { Asignaturas, Asignatura } from '../../service/asignatura';
import { Grupos, Grupo } from '../../service/grupos';
import { Docentes, Docente } from '../../service/docentes';
import { EspaciosFisicos, EspacioFisico } from '../../service/espacios-fisicos'; 

@Component({
  selector: 'app-clases',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clases.html',
  styleUrl: './clases.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clases {
  private fb = inject(FormBuilder);
  private servicio = inject(ClasesService);
  private asignaturaService = inject(Asignaturas);
  private grupoService = inject(Grupos);
  private docenteService = inject(Docentes);
  private espacioFisicoService = inject(EspaciosFisicos);

  clases = signal<Clase[]>([]);
  asignaturas = signal<Asignatura[]>([]);
  grupos = signal<Grupo[]>([]);
  docentes = signal<Docente[]>([]);
  espaciosFisicos = signal<EspacioFisico[]>([]);
  editing = signal<Clase | null>(null);

  form = this.fb.group<{
    aula: FormControl<string | null>;
    asignaturaId: FormControl<number | null>;
    grupoId: FormControl<number | null>;
    docenteId: FormControl<number | null>;
    espacioFisicoId: FormControl<number | null>;
  }>({
    aula: this.fb.control('', Validators.required),
    asignaturaId: this.fb.control<number | null>(null, Validators.required),
    grupoId: this.fb.control<number | null>(null),
    docenteId: this.fb.control<number | null>(null),
    espacioFisicoId: this.fb.control<number | null>(null),
  });

  constructor() {
    this.fetchClases();
    this.fetchAsignaturas();
    this.fetchGrupos();
    this.fetchDocentes();
    this.fetchEspaciosFisicos();
  }

  fetchGrupos() {
    this.grupoService.getAll().subscribe(data => this.grupos.set(data));
  }

  fetchDocentes() {
    this.docenteService.getAll().subscribe(data => this.docentes.set(data));
  }

  fetchClases() {
    this.servicio.getAll().subscribe(data => this.clases.set(data));
  }

  fetchAsignaturas() {
    this.asignaturaService.getAll().subscribe(data => this.asignaturas.set(data));
  }

  fetchEspaciosFisicos() {
    this.espacioFisicoService.getAll().subscribe(data => this.espaciosFisicos.set(data));
  }

  submit() {
    if (this.form.invalid) return;

    const aula = this.form.value.aula ?? '';
    const asignaturaId = this.form.value.asignaturaId!;
    const grupoId = this.form.value.grupoId!;
    const docenteId = this.form.value.docenteId!;
    const espacioFisicoId = this.form.value.espacioFisicoId!;

    const payload = {
      aula,
      asignatura: { id: asignaturaId },
      grupo: grupoId ? { id: grupoId } : null,
      docente: docenteId ? { id: docenteId } : null,
      espacioFisico: espacioFisicoId ? { id: espacioFisicoId } : null,
    };

    if (this.editing()) {
      const id = this.editing()!.id;
      this.servicio.update(id, payload).subscribe(() => {
        this.fetchClases();
        this.cancel();
      });
    } else {
      this.servicio.create(payload).subscribe(() => {
        this.fetchClases();
        this.form.reset();
      });
    }
  }

  edit(clase: Clase) {
    this.editing.set(clase);
    this.form.patchValue({
      aula: clase.aula,
      asignaturaId: clase.asignatura.id,
      grupoId: clase.grupo?.id ?? null,
      docenteId: clase.docente?.id ?? null,
      espacioFisicoId: clase.espacioFisico?.id ?? null
    });
  }

  delete(id: number) {
    this.servicio.delete(id).subscribe(() => this.fetchClases());
  }

  cancel() {
    this.editing.set(null);
    this.form.reset();
  }
}