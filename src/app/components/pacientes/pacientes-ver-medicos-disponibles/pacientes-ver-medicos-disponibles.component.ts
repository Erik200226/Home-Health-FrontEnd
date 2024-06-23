import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../model/medico';
import { MedicoService } from '../../../services/medico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes-ver-medicos-disponibles',
  templateUrl: './pacientes-ver-medicos-disponibles.component.html',
  styleUrl: './pacientes-ver-medicos-disponibles.component.css'
})
export class PacientesVerMedicosDisponiblesComponent implements OnInit {
  medicos: Medico[] = [];

  constructor(private medicoService: MedicoService, private router: Router) {}

  ngOnInit(): void {
    this.medicoService.list().subscribe(
      (data) => {
        this.medicos = data;
      },
      (error) => {
        console.error('Error fetching medicos data', error);
      }
    );
  }

  registrarCita(medico: Medico): void {
    this.router.navigate(['/paciente/registrar-cita', medico.id]);
  }
}