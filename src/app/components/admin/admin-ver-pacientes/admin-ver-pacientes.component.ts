import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../model/paciente';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-ver-pacientes',
  templateUrl: './admin-ver-pacientes.component.html',
  styleUrls: ['./admin-ver-pacientes.component.css']
})
export class AdminVerPacientesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'dni', 'fechaNacimiento', 'enabled', 'acciones'];
  dataSource = new MatTableDataSource<Paciente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pacienteService: PacienteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarPacientes();
  }

  listarPacientes(): void {
    this.pacienteService.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  confirmarEliminarPaciente(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar este paciente?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarPaciente(id);
      }
    });
  }

  eliminarPaciente(id: number): void {
    this.pacienteService.delete(id).subscribe(() => {
      this.listarPacientes();
    });
  }

  cambiarEstadoPaciente(id: number, enabled: boolean): void {
    this.pacienteService.cambiarEstado(id, enabled).subscribe(() => {
      this.listarPacientes();
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
