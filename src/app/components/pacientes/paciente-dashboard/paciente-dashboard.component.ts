import { Component, OnInit } from '@angular/core';
import { PacienteResponse } from '../../../model/paciente-response';
import { PacienteService } from '../../../services/paciente.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paciente-dashboard',
  templateUrl: './paciente-dashboard.component.html',
  styleUrl: './paciente-dashboard.component.css'
})
export class PacienteDashboardComponent implements OnInit {
  paciente: PacienteResponse | null = null;

  constructor(
    private pacienteService: PacienteService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.pacienteService.buscarPorUsername(username).subscribe(
        (data) => {
          this.paciente = data;
        },
        (error) => {
          console.error('Error fetching paciente data', error);
        }
      );
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}