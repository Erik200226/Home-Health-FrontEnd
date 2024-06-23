import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../../../services/medico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-registrar-medico',
  templateUrl: './admin-registrar-medico.component.html',
  styleUrls: ['./admin-registrar-medico.component.css']
})
export class AdminRegistrarMedicoComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      especialidad: ['', Validators.required],
      hospital: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  registrarMedico(): void {
    if (this.form.valid) {
      this.medicoService.insert(this.form.value).subscribe(() => {
        this.router.navigate(['/admin/ver-medicos']);
      });
    }
  }
}
