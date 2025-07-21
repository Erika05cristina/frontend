import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Perfil = {
  id: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilAcceso {

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/perfil-acceso';
  
  getAll(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.baseUrl);
  }

  getById(id: number): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Perfil, 'id'>): Observable<Perfil> {
    return this.http.post<Perfil>(this.baseUrl, data);
  }

  update(data: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(`${this.baseUrl}/${data.id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
