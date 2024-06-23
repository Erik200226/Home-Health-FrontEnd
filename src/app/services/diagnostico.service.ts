import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Diagnostico } from '../model/diagnostico';
import { environment } from '../../environments/environment';
import { DiagnosticoResponse } from '../model/diagnostico-response';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  private url = `${baseUrl}/api/diagnosticos`;
  private listaCambio = new Subject<Diagnostico[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(this.url + "/listar");
  }

  insert(diagnostico: Diagnostico): Observable<void> {
    return this.http.post<void>(this.url + "/registrar", diagnostico);
  }

  update(diagnostico: Diagnostico): Observable<void> {
    return this.http.put<void>(this.url + "/modificar", diagnostico);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + `/eliminar/${id}`);
  }

  listarId(id: number): Observable<Diagnostico> {
    return this.http.get<Diagnostico>(this.url + `/listar/${id}`);
  }

  listarPorPaciente(pacienteId: number): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(this.url + `/listarPorPaciente/${pacienteId}`);
  }
  listarPorPacientee(pacienteId: number): Observable<DiagnosticoResponse[]> {
    return this.http.get<DiagnosticoResponse[]>(this.url + `/listarPorPaciente/${pacienteId}`);
  }
  listarPorMedico(medicoId: number): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(this.url + `/listarPorMedico/${medicoId}`);
  }

  setList(listaNueva: Diagnostico[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
