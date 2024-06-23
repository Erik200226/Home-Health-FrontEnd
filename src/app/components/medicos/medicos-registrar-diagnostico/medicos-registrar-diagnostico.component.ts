import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Diagnostico } from '../../../model/diagnostico';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../model/cita';

@Component({
  selector: 'app-medicos-registrar-diagnostico',
  templateUrl: './medicos-registrar-diagnostico.component.html',
  styleUrl: './medicos-registrar-diagnostico.component.css'
})
export class MedicosRegistrarDiagnosticoComponent implements OnInit{
  form: FormGroup;
  citas: Cita[] = [];
  citaId: number = 0;
  nombrePaciente: string = '';
  dniPaciente: string = '';

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private diagnosticoService: DiagnosticoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      fecha: [{ value: '', disabled: true }],
      descripcion: ['', Validators.required],
      receta: ['', Validators.required],
      tratamiento: ['', Validators.required],
      idCita: ['', Validators.required],
      dniPaciente: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.citaId = +params['id'];
      this.form.get('idCita')?.setValue(this.citaId);
      this.obtenerCita(this.citaId);
    });
  }

  obtenerCita(id: number): void {
    this.citaService.listarId(id).subscribe(
      (cita: Cita) => {
        this.form.get('fecha')?.setValue(cita.fecha);
        this.form.get('dniPaciente')?.setValue(cita.dniPaciente);
        this.nombrePaciente = cita.nombrePaciente;
        this.dniPaciente = cita.dniPaciente;
      },
      (error) => {
        console.error('Error fetching cita data', error);
      }
    );
  }

  registrarDiagnostico(): void {
    if (this.form.valid) {
      const diagnosticoData: Diagnostico = {
        id: 0,
        descripcion: this.form.get('descripcion')?.value,
        receta: this.form.get('receta')?.value,
        tratamiento: this.form.get('tratamiento')?.value,
        citaId: this.form.get('idCita')?.value,
      };
      this.diagnosticoService.insert(diagnosticoData).subscribe(() => {
        this.router.navigate(['/medico/ver-diagnosticos']);
      });
    }
  }
}