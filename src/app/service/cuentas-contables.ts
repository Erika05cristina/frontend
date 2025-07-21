import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type CuentaContable = {
  id: number;
  codigo: string;
  nombre: string;
  planCuenta?: {
    id: number;
    nombre?: string;
    descripcion?: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class CuentaContableService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/cuentas-contables';

  getAll(): Observable<CuentaContable[]> {
    return this.http.get<CuentaContable[]>(this.baseUrl);
  }

  getById(id: number): Observable<CuentaContable> {
    return this.http.get<CuentaContable>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<CuentaContable, 'id'>): Observable<CuentaContable> {
    return this.http.post<CuentaContable>(this.baseUrl, data);
  }

  update(id: number, data: Omit<CuentaContable, 'id'>): Observable<CuentaContable> {
    return this.http.put<CuentaContable>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
