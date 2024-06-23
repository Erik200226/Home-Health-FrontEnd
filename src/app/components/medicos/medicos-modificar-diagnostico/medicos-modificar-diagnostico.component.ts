import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Diagnostico } from '../../../model/diagnostico';


@Component({
  selector: 'app-medicos-modificar-diagnostico',
  templateUrl: './medicos-modificar-diagnostico.component.html',
  styleUrl: './medicos-modificar-diagnostico.component.css'
})
export class MedicosModificarDiagnosticoComponent implements OnInit {
  form: FormGroup;
  diagnosticoId: number = 0;

  constructor(
    private fb: FormBuilder,
    private diagnosticoService: DiagnosticoService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      receta: ['', Validators.required],
      tratamiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.diagnosticoId = +params['id'];
      this.obtenerDiagnostico(this.diagnosticoId);
    });
  }

  obtenerDiagnostico(id: number): void {
    this.diagnosticoService.listarId(id).subscribe(
      (diagnostico: Diagnostico) => {
        this.form.patchValue({
          descripcion: diagnostico.descripcion,
          receta: diagnostico.receta,
          tratamiento: diagnostico.tratamiento
        });
      },
      (error) => {
        console.error('Error fetching diagnostico data', error);
      }
    );
  }

  editarDiagnostico(): void {
    if (this.form.valid) {
      const diagnosticoData: Diagnostico = {
        id: this.diagnosticoId,
        descripcion: this.form.get('descripcion')?.value,
        receta: this.form.get('receta')?.value,
        tratamiento: this.form.get('tratamiento')?.value,
        citaId: 0 // o el valor adecuado según tu modelo
      };
      this.diagnosticoService.update(diagnosticoData).subscribe(() => {
        this.router.navigate(['/medico/ver-diagnosticos']);
      });
    }
  }
}