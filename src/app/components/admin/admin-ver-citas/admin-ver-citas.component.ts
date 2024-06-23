import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../model/cita';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-ver-citas',
  templateUrl: './admin-ver-citas.component.html',
  styleUrls: ['./admin-ver-citas.component.css']
})
export class AdminVerCitasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'turno', 'nombrePaciente', 'dniPaciente', 'nombreMedico', 'especialidadMedico', 'hospitalMedico', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<Cita>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private citaService: CitaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarCitas();
  }

  listarCitas(): void {
    this.citaService.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  confirmarEliminarCita(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar esta cita?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarCita(id);
      }
    });
  }

  eliminarCita(id: number): void {
    this.citaService.delete(id).subscribe(() => {
      this.listarCitas();
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
