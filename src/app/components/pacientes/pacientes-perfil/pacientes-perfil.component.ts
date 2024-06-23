import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteResponse } from '../../../model/paciente-response';
import { PacienteService } from '../../../services/paciente.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-pacientes-perfil',
  templateUrl: './pacientes-perfil.component.html',
  styleUrls: ['./pacientes-perfil.component.css']
})
export class PacientesPerfilComponent implements OnInit {
  paciente$: Observable<PacienteResponse | null>;

  constructor(private pacienteService: PacienteService, private loginService: LoginService) {
    this.paciente$ = new Observable<PacienteResponse | null>();
  }

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.paciente$ = this.pacienteService.buscarPorUsername(username);
    }
  }
}
