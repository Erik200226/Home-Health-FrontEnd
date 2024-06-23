// pacientes-ver-citas.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cita } from '../../../model/cita';
import { Medico } from '../../../model/medico';
import { CitaService } from '../../../services/cita.service';
import { MedicoService } from '../../../services/medico.service';
import { LoginService } from '../../../services/login.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { PacienteService } from '../../../services/paciente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-pacientes-ver-citas',
  templateUrl: './pacientes-ver-citas.component.html',
  styleUrls: ['./pacientes-ver-citas.component.css']
})
export class PacientesVerCitasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'turno', 'dniPaciente', 'medicoNombre', 'medicoEspecialidad', 'medicoHospital', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<Cita>();
  filterForm: FormGroup;
  turnos: string[] = ['All', 'Mañana', 'Tarde', 'Noche'];
  pacienteId: number = 0;
  especialidades: string[] = ['All'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      turno: ['All'],
      especialidad: ['All']
    });
  }

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    this.pacienteService.buscarPorUsername(username).subscribe(
      (data) => {
        this.pacienteId = data.id;
        this.cargarCitas();
      },
      (error) => {
        console.error('Error fetching paciente data', error);
      }
    );

    this.cargarEspecialidades();
  }

  cargarCitas(): void {
    this.citaService.listarPorPaciente(this.pacienteId).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching citas data', error);
      }
    );
  }

  cargarEspecialidades(): void {
    this.citaService.list().subscribe(
      (data) => {
        this.especialidades.push(...new Set(data.map(cita => cita.medicoEspecialidad)));
      },
      (error) => {
        console.error('Error fetching especialidades data', error);
      }
    );
  }

  buscarPorFechas(): void {
    const { startDate, endDate } = this.filterForm.value;
    if (startDate && endDate) {
      this.citaService.buscarPorFechas(startDate, endDate).subscribe(
        (data) => {
          const filteredCitas = data.filter(cita => cita.pacienteId === this.pacienteId);
          this.dataSource.data = filteredCitas;
        },
        (error) => {
          console.error('Error fetching citas data', error);
        }
      );
    }
  }

  filtrarPorTurno(turno: string): void {
    if (turno === 'All') {
      this.cargarCitas();
    } else {
      this.dataSource.data = this.dataSource.data.filter(cita => cita.turno === turno);
    }
  }

  filtrarPorEspecialidad(especialidad: string): void {
    if (especialidad === 'All') {
      this.cargarCitas();
    } else {
      this.dataSource.data = this.dataSource.data.filter(cita => cita.medicoEspecialidad === especialidad);
    }
  }

  limpiarFiltros(): void {
    this.filterForm.reset({ turno: 'All', especialidad: 'All' });
    this.cargarCitas();
  }

  cancelarCita(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: '¿Estás seguro de que deseas cancelar esta cita?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.citaService.delete(id).subscribe(() => {
          this.cargarCitas();
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}