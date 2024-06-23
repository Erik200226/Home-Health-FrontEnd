import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from '../../../model/cita';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CitaService } from '../../../services/cita.service';
import { MedicoService } from '../../../services/medico.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-medicos-ver-citas',
  templateUrl: './medicos-ver-citas.component.html',
  styleUrl: './medicos-ver-citas.component.css'
})
export class MedicosVerCitasComponent implements OnInit{
  displayedColumns: string[] = ['id', 'fecha', 'turno', 'dniPaciente', 'nombrePaciente', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<Cita>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private citaService: CitaService,
    private medicoService: MedicoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    this.medicoService.buscarPorUsername(username).subscribe(
      (data) => {
        const medicoId = data.id;
        this.cargarCitas(medicoId);
      },
      (error) => {
        console.error('Error fetching medico data', error);
      }
    );
  }

  cargarCitas(medicoId: number): void {
    this.citaService.listarPorMedicoo(medicoId).subscribe(
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cancelarCita(id: number): void {
    if (confirm('¿Está seguro de que desea cancelar esta cita?')) {
      this.citaService.delete(id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(cita => cita.id !== id);
        },
        (error) => {
          console.error('Error canceling cita', error);
        }
      );
    }
  }
}