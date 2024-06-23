import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '../../../services/cita.service';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { Router } from '@angular/router';
import { Cita } from '../../../model/cita';
import { Diagnostico } from '../../../model/diagnostico';

@Component({
  selector: 'app-admin-registrar-diagnostico',
  templateUrl: './admin-registrar-diagnostico.component.html',
  styleUrls: ['./admin-registrar-diagnostico.component.css']
})
export class AdminRegistrarDiagnosticoComponent implements OnInit {
  form: FormGroup;
  citas: Cita[] = [];
  minDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private diagnosticoService: DiagnosticoService,
    private router: Router
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
    this.citaService.list().subscribe(data => {
      this.citas = data;
    });
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
        this.router.navigate(['/admin/ver-diagnosticos']);
      });
    }
  }

  onCitaChange(event: any): void {
    const selectedCita = this.citas.find(c => c.id === event.value);
    if (selectedCita) {
      this.form.get('fecha')?.setValue(selectedCita.fecha);
      this.form.get('dniPaciente')?.setValue(selectedCita.dniPaciente);
    }
  }
}
