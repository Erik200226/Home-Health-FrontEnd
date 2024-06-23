import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteResponse } from '../../../model/paciente-response';
import { PacienteService } from '../../../services/paciente.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pacientes-editar-perfil',
  templateUrl: './pacientes-editar-perfil.component.html',
  styleUrl: './pacientes-editar-perfil.component.css'
})
export class PacientesEditarPerfilComponent {
  editForm: FormGroup;
  paciente: PacienteResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: [{ value: '', disabled: true }, Validators.required],
      fechaNacimiento: ['', Validators.required],
      username: [{ value: '', disabled: true }],
      password: [{ value: ''}]
    });
  }

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.pacienteService.buscarPorUsername(username).subscribe(
        (data) => {
          this.paciente = data;
          this.editForm.patchValue({
            nombre: this.paciente.nombre,
            apellido: this.paciente.apellido,
            dni: this.paciente.dni,
            fechaNacimiento: this.paciente.fechaNacimiento,
            username: this.paciente.username,
            password: this.paciente.password
          });
        },
        (error) => {
          console.error('Error fetching paciente data', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.paciente) {
      const updatedPaciente = {
        ...this.paciente,
        ...this.editForm.getRawValue()
      };
      this.pacienteService.update(updatedPaciente).subscribe(
        () => {
          alert('Perfil actualizado exitosamente');
          this.router.navigate(['/paciente/perfil']);
        },
        (error) => {
          console.error('Error updating paciente data', error);
        }
      );
    }
  }
}
