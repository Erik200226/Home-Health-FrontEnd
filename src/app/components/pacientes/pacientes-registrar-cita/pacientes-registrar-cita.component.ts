import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '../../../services/cita.service';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteResponse } from '../../../model/paciente-response';
import { PacienteService } from '../../../services/paciente.service';
import { Medico } from '../../../model/medico';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-pacientes-registrar-cita',
  templateUrl: './pacientes-registrar-cita.component.html',
  styleUrl: './pacientes-registrar-cita.component.css'
})
export class PacientesRegistrarCitaComponent implements OnInit {
  form: FormGroup;
  turnos: string[] = ['Mañana', 'Tarde', 'Noche'];
  minDate: Date = new Date();
  medicoId: number = 0;
  medicoNombre: string = '';
  medicoEspecialidad: string = '';
  paciente: PacienteResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      turno: ['', Validators.required],
      dniPaciente: ['', Validators.required],
      idMedico: ['', Validators.required],
      precio: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.medicoId = +params['id'];
      this.form.get('idMedico')?.setValue(this.medicoId);
      this.obtenerMedico(this.medicoId);
    });

    const username = this.loginService.getUsername();
    if (username) {
      this.pacienteService.buscarPorUsername(username).subscribe(
        (data) => {
          this.paciente = data;
          this.form.get('dniPaciente')?.setValue(this.paciente.dni);
        },
        (error) => {
          console.error('Error fetching paciente data', error);
        }
      );
    }

    this.form.get('turno')?.valueChanges.subscribe(turno => {
      this.actualizarPrecio(turno);
    });
  }

  obtenerMedico(id: number): void {
    this.medicoService.listarId(id).subscribe(
      (medico: Medico) => {
        this.medicoNombre = medico.nombre + ' ' + medico.apellido;
        this.medicoEspecialidad = medico.especialidad;
      },
      (error) => {
        console.error('Error fetching medico data', error);
      }
    );
  }

  registrarCita(): void {
    if (this.form.valid) {
      const citaData = {
        ...this.form.getRawValue(),
        precio: this.form.get('precio')?.value
      };
      this.citaService.insert(citaData).subscribe(() => {
        this.router.navigate(['/paciente/ver-citas']);
      });
    }
  }

  actualizarPrecio(turno: string): void {
    let precio = 0;
    switch (turno) {
      case 'Mañana':
        precio = 100;
        break;
      case 'Tarde':
        precio = 150;
        break;
      case 'Noche':
        precio = 200;
        break;
    }
    this.form.get('precio')?.setValue(precio);
  }
}