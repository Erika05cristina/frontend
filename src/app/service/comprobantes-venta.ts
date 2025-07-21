import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RubroClass } from './rubro';

export type ComprobanteVenta = {
  id: number;
  numero: string;
  fechaEmision: string;
  total: number;
  estudiante: {
    id: number;
    nombres?: string;
    apellidos?: string;
  };
  rubros: RubroClass[];
};
 
export type ComprobanteVentaPayload = {
  numero: string;
  fechaEmision: string;
  total: number;
  estudiante: { id: number };
  rubros: { id: number }[];
};

@Injectable({
  providedIn: 'root'
})
export class ComprobantesVenta {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/comprobantes-venta';

  getAll(): Observable<ComprobanteVenta[]> {
    return this.http.get<ComprobanteVenta[]>(this.baseUrl);
  }

  getById(id: number): Observable<ComprobanteVenta> {
    return this.http.get<ComprobanteVenta>(`${this.baseUrl}/${id}`);
  }

  create(data: ComprobanteVentaPayload): Observable<ComprobanteVenta> {
    return this.http.post<ComprobanteVenta>(this.baseUrl, data);
  }

  update(id: number, data: ComprobanteVentaPayload): Observable<ComprobanteVenta> {
    return this.http.put<ComprobanteVenta>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
