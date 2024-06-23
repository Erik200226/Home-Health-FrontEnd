import { Component, OnInit } from '@angular/core';
import { MedicoResponse } from '../../../model/medico-response';
import { MedicoService } from '../../../services/medico.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-dashboard',
  templateUrl: './medico-dashboard.component.html',
  styleUrl: './medico-dashboard.component.css'
})
export class MedicoDashboardComponent implements OnInit {
  medico: MedicoResponse | null = null;

  constructor(
    private medicoService: MedicoService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.medicoService.buscarPorUsername(username).subscribe(
        (data) => {
          this.medico = data;
        },
        (error) => {
          console.error('Error fetching medico data', error);
        }
      );
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}