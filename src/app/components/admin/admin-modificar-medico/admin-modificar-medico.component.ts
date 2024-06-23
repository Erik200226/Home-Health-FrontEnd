import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../model/medico';

@Component({
  selector: 'app-admin-modificar-medico',
  templateUrl: './admin-modificar-medico.component.html',
  styleUrls: ['./admin-modificar-medico.component.css']
})
export class AdminModificarMedicoComponent implements OnInit {
  form: FormGroup;
  medicoId: number = 0;

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.medicoId = this.route.snapshot.params['id'];
    this.medicoService.listarId(this.medicoId).subscribe((data: Medico) => {
      this.form.patchValue(data);
    });
  }

  modificarMedico(): void {
    if (this.form.valid) {
      this.medicoService.update({ id: this.medicoId, ...this.form.value }).subscribe(() => {
        this.router.navigate(['/admin/ver-medicos']);
      });
    }
  }
}

