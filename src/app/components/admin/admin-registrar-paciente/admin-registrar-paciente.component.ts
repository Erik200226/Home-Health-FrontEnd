import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../../../services/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-registrar-paciente',
  templateUrl: './admin-registrar-paciente.component.html',
  styleUrls: ['./admin-registrar-paciente.component.css']
})
export class AdminRegistrarPacienteComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  registrarPaciente(): void {
    if (this.form.valid) {
      this.pacienteService.insert(this.form.value).subscribe(() => {
        this.router.navigate(['/admin/ver-pacientes']);
      });
    }
  }
}
