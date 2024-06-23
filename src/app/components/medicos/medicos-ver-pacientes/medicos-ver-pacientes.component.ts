import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from '../../../model/cita';
import { CitaService } from '../../../services/cita.service';
import { MedicoService } from '../../../services/medico.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicos-ver-pacientes',
  templateUrl: './medicos-ver-pacientes.component.html',
  styleUrl: './medicos-ver-pacientes.component.css'
})
export class MedicosVerPacientesComponent implements OnInit{
  citas: Cita[] = [];

  constructor(
    private citaService: CitaService,
    private medicoService: MedicoService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    this.medicoService.buscarPorUsername(username).subscribe(
      (data) => {
        const medicoId = data.id;
        this.cargarCitas(medicoId);
      },
      (error) => {
        console.error('Error fetching medico data', error);
      }
    );
  }

  cargarCitas(medicoId: number): void {
    this.citaService.listarPorMedicoo(medicoId).subscribe(
      (data) => {
        this.citas = data;
      },
      (error) => {
        console.error('Error fetching citas data', error);
      }
    );
  }

  registrarDiagnostico(cita: Cita): void {
    this.router.navigate(['/medico/registrar-diagnostico', cita.id]);
  }
}