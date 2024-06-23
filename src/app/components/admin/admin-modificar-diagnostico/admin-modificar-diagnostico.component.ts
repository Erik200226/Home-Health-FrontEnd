import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { CitaService } from '../../../services/cita.service';
import { Diagnostico } from '../../../model/diagnostico';
import { Cita } from '../../../model/cita';

@Component({
  selector: 'app-admin-modificar-diagnostico',
  templateUrl: './admin-modificar-diagnostico.component.html',
  styleUrls: ['./admin-modificar-diagnostico.component.css']
})
export class AdminModificarDiagnosticoComponent implements OnInit {
  form: FormGroup;
  citas: Cita[] = [];
  minDate: Date = new Date();
  diagnosticoId: number = 0;

  constructor(
    private fb: FormBuilder,
    private diagnosticoService: DiagnosticoService,
    private citaService: CitaService,
    private route: ActivatedRoute,
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
    this.diagnosticoId = this.route.snapshot.params['id'];
    this.diagnosticoService.listarId(this.diagnosticoId).subscribe((data: Diagnostico) => {
      this.form.patchValue({
        descripcion: data.descripcion,
        receta: data.receta,
        tratamiento: data.tratamiento,
        idCita: data.citaId
      });
      this.actualizarDatosCita(data.citaId);
    });

    this.citaService.list().subscribe(data => {
      this.citas = data;
    });
  }

  modificarDiagnostico(): void {
    if (this.form.valid) {
      const updatedDiagnostico: Diagnostico = {
        id: this.diagnosticoId,
        descripcion: this.form.get('descripcion')?.value,
        receta: this.form.get('receta')?.value,
        tratamiento: this.form.get('tratamiento')?.value,
        citaId: this.form.get('idCita')?.value,
      };
      this.diagnosticoService.update(updatedDiagnostico).subscribe(() => {
        this.router.navigate(['/admin/ver-diagnosticos']);
      });
    }
  }

  onCitaChange(event: any): void {
    this.actualizarDatosCita(event.value);
  }

  actualizarDatosCita(idCita: number): void {
    const selectedCita = this.citas.find(c => c.id === idCita);
    if (selectedCita) {
      this.form.get('fecha')?.setValue(selectedCita.fecha);
      this.form.get('dniPaciente')?.setValue(selectedCita.dniPaciente);
    }
  }
}
