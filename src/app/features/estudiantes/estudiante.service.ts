import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Observable } from 'rxjs';

export interface Estudiante {
  id?: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  fechaNacimiento: string;
}

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private readonly api = inject(ApiService);

  list(): Observable<Estudiante[]> {
    return this.api.get<Estudiante[]>('estudiantes');
  }

  get(id: number): Observable<Estudiante> {
    return this.api.get<Estudiante>(`estudiantes/${id}`);
  }

  create(estudiante: Estudiante): Observable<Estudiante> {
    return this.api.post<Estudiante>('estudiantes', estudiante);
  }

  update(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.api.put<Estudiante>(`estudiantes/${id}`, estudiante);
  }

  remove(id: number): Observable<void> {
    return this.api.delete<void>(`estudiantes/${id}`);
  }
}
