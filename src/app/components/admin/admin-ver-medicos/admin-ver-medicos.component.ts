import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../model/medico';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-ver-medicos',
  templateUrl: './admin-ver-medicos.component.html',
  styleUrls: ['./admin-ver-medicos.component.css']
})
export class AdminVerMedicosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'especialidad', 'hospital', 'acciones'];
  dataSource = new MatTableDataSource<Medico>();
  especialidades: string[] = [];
  selectedEspecialidad: string = 'All';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private medicoService: MedicoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarMedicos();
    this.obtenerEspecialidades();
  }

  listarMedicos(): void {
    this.medicoService.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  confirmarEliminarMedico(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar este médico?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarMedico(id);
      }
    });
  }

  eliminarMedico(id: number): void {
    this.medicoService.delete(id).subscribe(() => {
      this.listarMedicos();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  obtenerEspecialidades(): void {
    this.medicoService.list().subscribe(data => {
      this.especialidades = ['All', ...new Set(data.map(medico => medico.especialidad))];
    });
  }

  filtrarPorEspecialidad(): void {
    if (this.selectedEspecialidad && this.selectedEspecialidad !== 'All') {
      this.dataSource.data = this.dataSource.data.filter(medico => medico.especialidad === this.selectedEspecialidad);
    } else {
      this.listarMedicos();
    }
  }
}
