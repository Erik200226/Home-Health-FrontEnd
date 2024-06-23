import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../../services/medico.service';
import { CitaService } from '../../../services/cita.service';
import { Medico } from '../../../model/medico';
import { Cita } from '../../../model/cita';

@Component({
  selector: 'app-admin-modificar-cita',
  templateUrl: './admin-modificar-cita.component.html',
  styleUrls: ['./admin-modificar-cita.component.css']
})
export class AdminModificarCitaComponent implements OnInit {
  form: FormGroup;
  medicos: Medico[] = [];
  turnos: string[] = ['Mañana', 'Tarde', 'Noche'];
  minDate: Date = new Date();
  citaId: number = 0;

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private citaService: CitaService,
    private route: ActivatedRoute,
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
    this.citaId = this.route.snapshot.params['id'];
    this.citaService.listarId(this.citaId).subscribe((data: Cita) => {
      this.form.patchValue({
        fecha: data.fecha,
        turno: data.turno,
        dniPaciente: data.dniPaciente,
        idMedico: data.idMedico,
        precio: data.precio
      });
    });

    this.medicoService.list().subscribe(data => {
      this.medicos = data;
    });

    this.form.get('turno')?.valueChanges.subscribe(turno => {
      this.actualizarPrecio(turno);
    });
  }

  modificarCita(): void {
    if (this.form.valid) {
      const updatedCita = {
        ...this.form.value,
        precio: this.form.get('precio')?.value // Habilitamos el valor de precio antes de enviarlo
      };
      this.citaService.update({ id: this.citaId, ...updatedCita }).subscribe(() => {
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
