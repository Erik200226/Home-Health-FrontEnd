import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Paciente } from '../model/paciente';
import { environment } from '../../environments/environment';
import { PacienteResponse } from '../model/paciente-response';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private url = `${baseUrl}/api/pacientes`;
  private listaCambio = new Subject<Paciente[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url + "/listar");
  }

  insert(paciente: Paciente): Observable<void> {
    return this.http.post<void>(this.url + "/registrar", paciente);
  }

  update(paciente: Paciente): Observable<void> {
    return this.http.put<void>(this.url + "/modificar", paciente);
  }
  updatee(paciente: PacienteResponse): Observable<void> {
    return this.http.put<void>(this.url + "/modificar", paciente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + `/eliminar/${id}`);
  }

  listarId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(this.url + `/listar/${id}`);

  }
  listarrId(id: number): Observable<PacienteResponse> {
    return this.http.get<PacienteResponse>(`${this.url}/listar/${id}`);
  }

  buscarPorApellido(apellido: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url + `/buscarApellido/${apellido}`);
  }

  buscarPorNombre(nombre: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url + `/buscarNombre/${nombre}`);
  }

  listarPacientesConDiagnosticosRecientes(startDate: Date, endDate: Date): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url + `/recentDiagnosticos?startDate=${startDate}&endDate=${endDate}`);
  }

  contarPacientesPorHospital(hospital: string): Observable<number> {
    return this.http.get<number>(this.url + `/countByHospital/${hospital}`);
  }

  cambiarEstado(id: number, enabled: boolean): Observable<void> {
    return this.http.put<void>(`${this.url}/cambiarEstado/${id}?enabled=${enabled}`, {});
  }
  buscarPorUsername(username: string): Observable<PacienteResponse> {
    return this.http.get<PacienteResponse>(`${this.url}/buscarPorUsername/${username}`);
  }

  setList(listaNueva: Paciente[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
