import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Plan = {
  id: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlanCuenta {

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/plan-cuenta';

  getAll(): Observable<PlanCuenta[]> {
    return this.http.get<PlanCuenta[]>(this.baseUrl);
  }

  getById(id: number): Observable<PlanCuenta> {
    return this.http.get<PlanCuenta>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<PlanCuenta, 'id'>): Observable<PlanCuenta> {
    return this.http.post<PlanCuenta>(this.baseUrl, data);
  }

  update(data: PlanCuenta): Observable<PlanCuenta> {
    return this.http.put<PlanCuenta>(this.baseUrl, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
