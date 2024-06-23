import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Cita } from '../model/cita';
import { environment } from '../../environments/environment';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private url = `${baseUrl}/api/citas`;
  private listaCambio = new Subject<Cita[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.url + "/listar");
  }

  insert(cita: Cita): Observable<void> {
    return this.http.post<void>(this.url + "/registrar", cita);
  }

  update(cita: Cita): Observable<void> {
    return this.http.put<void>(this.url + "/modificar", cita);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + `/eliminar/${id}`);
  }

  listarId(id: number): Observable<Cita> {
    return this.http.get<Cita>(this.url + `/listar/${id}`);
  }

  listarPorPaciente(pacienteId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.url + `/listarPorPaciente/${pacienteId}`);
  }
  
  listarPorMedicoo(medicoId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.url + `/listarPorMedicoo/${medicoId}`);
  }
  buscarPorFechas(startDate: Date, endDate: Date): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.url + `/buscarPorFechas?startDate=${startDate}&endDate=${endDate}`);
  }

  verificarDisponibilidad(medicoId: number, fecha: Date, turno: string): Observable<boolean> {
    return this.http.get<boolean>(this.url + `/verificarDisponibilidad?medicoId=${medicoId}&fecha=${fecha}&turno=${turno}`);
  }

  contarCitasPorMedico(medicoId: number, fecha: Date): Observable<number> {
    return this.http.get<number>(this.url + `/contarCitasPorMedico?medicoId=${medicoId}&fecha=${fecha}`);
  }

  sumPrecioByMedicoId(medicoId: number): Observable<number> {
    return this.http.get<number>(this.url + `/sumPrecioByMedicoId/${medicoId}`);
  }
  //////
  citasPorTurno(): Observable<any> {
    return this.http.get<any>(`${this.url}/citasPorTurno`);
  }

  setList(listaNueva: Cita[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
