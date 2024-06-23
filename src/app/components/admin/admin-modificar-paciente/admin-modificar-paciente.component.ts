import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../model/paciente';

@Component({
  selector: 'app-admin-modificar-paciente',
  templateUrl: './admin-modificar-paciente.component.html',
  styleUrls: ['./admin-modificar-paciente.component.css']
})
export class AdminModificarPacienteComponent implements OnInit {
  form: FormGroup;
  pacienteId: number = 0;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      username: ['', Validators.required],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.pacienteId = this.route.snapshot.params['id'];
    this.pacienteService.listarId(this.pacienteId).subscribe((data: Paciente) => {
      this.form.patchValue(data);
    });
  }

  modificarPaciente(): void {
    if (this.form.valid) {
      this.pacienteService.update({ id: this.pacienteId, ...this.form.value }).subscribe(() => {
        this.router.navigate(['/admin/ver-pacientes']);
      });
    }
  }
}
