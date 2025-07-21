import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Plan = {
  id: number;
  nombre: string;
  descripcion: string;
};

@Injectable({
  providedIn: 'root'
})
export class PlanCuentaService {  // <<< CAMBIA NOMBRE DEL SERVICIO

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/plan-cuenta';

  getAll(): Observable<Plan[]> {   // <<< USA `Plan` aquí
    return this.http.get<Plan[]>(this.baseUrl);
  }

  getById(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Plan, 'id'>): Observable<Plan> {
    return this.http.post<Plan>(this.baseUrl, data);
  }

  update(data: Plan): Observable<Plan> {
    return this.http.put<Plan>(this.baseUrl, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
