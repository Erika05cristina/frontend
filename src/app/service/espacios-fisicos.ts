import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type EspacioFisico = {
  id: number;
  nombre: string;
  capacidad: number;
  ubicacion: string;
};

@Injectable({
  providedIn: 'root'
})
export class EspaciosFisicos {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/espacios-fisicos';

  getAll(): Observable<EspacioFisico[]> {
    return this.http.get<EspacioFisico[]>(this.baseUrl);
  }

  getById(id: number): Observable<EspacioFisico> {
    return this.http.get<EspacioFisico>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<EspacioFisico, 'id'>): Observable<EspacioFisico> {
    return this.http.post<EspacioFisico>(this.baseUrl, data);
  }

  update(id: number, data: Omit<EspacioFisico, 'id'>): Observable<EspacioFisico> {
    return this.http.put<EspacioFisico>(`${this.baseUrl}/${id}`, { id, ...data });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
