import { Component, OnInit, ViewChild } from '@angular/core';
import { DiagnosticoResponse } from '../../../model/diagnostico-response';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { LoginService } from '../../../services/login.service';
import { PacienteService } from '../../../services/paciente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pacientes-ver-diagnosticos',
  templateUrl: './pacientes-ver-diagnosticos.component.html',
  styleUrl: './pacientes-ver-diagnosticos.component.css'
})
export class PacientesVerDiagnosticosComponent implements OnInit {
  diagnosticos: MatTableDataSource<DiagnosticoResponse> = new MatTableDataSource<DiagnosticoResponse>([]);
  pacienteId: number = 0;
  displayedColumns: string[] = ['fechaCita', 'nombrePaciente', 'dniPaciente', 'nombreMedico', 'descripcion', 'receta', 'tratamiento'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private diagnosticoService: DiagnosticoService,
    private pacienteService: PacienteService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    this.pacienteService.buscarPorUsername(username).subscribe(
      (data) => {
        this.pacienteId = data.id;
        this.cargarDiagnosticos();
      },
      (error) => {
        console.error('Error fetching paciente data', error);
      }
    );
  }

  cargarDiagnosticos(): void {
    this.diagnosticoService.listarPorPacientee(this.pacienteId).subscribe(
      (data: DiagnosticoResponse[]) => {
        this.diagnosticos = new MatTableDataSource(data);
        this.diagnosticos.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching diagnosticos', error);
      }
    );
  }
}