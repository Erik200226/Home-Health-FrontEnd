import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../../../services/medico.service';
import { CitaService } from '../../../services/cita.service';
import { Router } from '@angular/router';
import { Medico } from '../../../model/medico';

@Component({
  selector: 'app-admin-registrar-cita',
  templateUrl: './admin-registrar-cita.component.html',
  styleUrls: ['./admin-registrar-cita.component.css']
})
export class AdminRegistrarCitaComponent implements OnInit {
  form: FormGroup;
  medicos: Medico[] = [];
  turnos: string[] = ['Mañana', 'Tarde', 'Noche'];
  minDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private citaService: CitaService,
    private router: Router
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
    this.medicoService.list().subscribe(data => {
      this.medicos = data;
    });

    this.form.get('turno')?.valueChanges.subscribe(turno => {
      this.actualizarPrecio(turno);
    });
  }

  registrarCita(): void {
    if (this.form.valid) {
      const citaData = {
        ...this.form.value,
        precio: this.form.get('precio')?.value // Habilitamos el valor de precio antes de enviarlo
      };
      this.citaService.insert(citaData).subscribe(() => {
        this.router.navigate(['/admin/ver-citas']);
      });
    }
  }

  onMedicoChange(event: any): void {
    const selectedMedico = this.medicos.find(m => m.id === event.value);
    if (selectedMedico) {
      this.form.get('idMedico')?.setValue(selectedMedico.id);
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
