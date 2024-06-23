import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoResponse } from '../../../model/medico-response';
import { MedicoService } from '../../../services/medico.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicos-editar-perfil',
  templateUrl: './medicos-editar-perfil.component.html',
  styleUrl: './medicos-editar-perfil.component.css'
})
export class MedicosEditarPerfilComponent implements OnInit{
  editForm: FormGroup;
  medico: MedicoResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      especialidad: ['', Validators.required],
      hospital: ['', Validators.required],
      username: [{ value: '', disabled: true }],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.medicoService.buscarPorUsername(username).subscribe(
        (data) => {
          this.medico = data;
          this.editForm.patchValue({
            nombre: this.medico.nombre,
            apellido: this.medico.apellido,
            especialidad: this.medico.especialidad,
            hospital: this.medico.hospital,
            username: this.medico.username,
            password: this.medico.password
          });
        },
        (error) => {
          console.error('Error fetching medico data', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.medico) {
      const updatedMedico = {
        ...this.medico,
        ...this.editForm.getRawValue()
      };
      this.medicoService.modificar(updatedMedico).subscribe(
        () => {
          alert('Perfil actualizado exitosamente');
          this.router.navigate(['/medico/perfil']);
        },
        (error) => {
          console.error('Error updating medico data', error);
        }
      );
    }
  }
}