import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Medico } from '../model/medico';
import { environment } from '../../environments/environment';
import { MedicoResponse } from '../model/medico-response';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private url = `${baseUrl}/api/medicos`;
  private listaCambio = new Subject<Medico[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.url + "/listar");
  }

  insert(medico: Medico): Observable<void> {
    return this.http.post<void>(this.url + "/registrar", medico);
  }

  update(medico: Medico): Observable<void> {
    return this.http.put<void>(this.url + "/modificar", medico);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + `/eliminar/${id}`);
  }

  listarId(id: number): Observable<Medico> {
    return this.http.get<Medico>(this.url + `/listar/${id}`);
  }
  listarrId(id: number): Observable<MedicoResponse> {
    return this.http.get<MedicoResponse>(`${this.url}/listar/${id}`);
  }

  buscarPorUsername(username: string): Observable<MedicoResponse> {
    return this.http.get<MedicoResponse>(`${this.url}/buscarPorUsername/${username}`);
  }

  modificar(medico: MedicoResponse): Observable<void> {
    return this.http.put<void>(`${this.url}/modificar`, medico);
  }
  listarIngresos(id: number): Observable<number> {
    return this.http.get<number>(this.url + `/listarIngresos/${id}`);
  }

  listarPorEspecialidad(especialidad: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.url + `/especialidad/${especialidad}`);
  }

  buscarPorNombreCompleto(nombre: string, apellido: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.url + `/buscarNombreCompleto?nombre=${nombre}&apellido=${apellido}`);
  }

  setList(listaNueva: Medico[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
