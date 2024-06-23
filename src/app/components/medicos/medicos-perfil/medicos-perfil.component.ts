import { Component, OnInit } from '@angular/core';
import { MedicoResponse } from '../../../model/medico-response';
import { Observable } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-medicos-perfil',
  templateUrl: './medicos-perfil.component.html',
  styleUrl: './medicos-perfil.component.css'
})
export class MedicosPerfilComponent implements OnInit{
  medico$: Observable<MedicoResponse | null>;

  constructor(private medicoService: MedicoService, private loginService: LoginService) {
    this.medico$ = new Observable<MedicoResponse | null>();
  }

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.medico$ = this.medicoService.buscarPorUsername(username);
    }
  }

}
