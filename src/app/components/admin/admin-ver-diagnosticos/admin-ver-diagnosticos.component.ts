import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { Diagnostico } from '../../../model/diagnostico';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-ver-diagnosticos',
  templateUrl: './admin-ver-diagnosticos.component.html',
  styleUrls: ['./admin-ver-diagnosticos.component.css']
})
export class AdminVerDiagnosticosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'dniPaciente', 'nombreMedico', 'descripcion', 'receta', 'tratamiento', 'acciones'];
  dataSource = new MatTableDataSource<Diagnostico>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private diagnosticoService: DiagnosticoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarDiagnosticos();
  }

  listarDiagnosticos(): void {
    this.diagnosticoService.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  confirmarEliminarDiagnostico(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que deseas eliminar este diagnóstico?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarDiagnostico(id);
      }
    });
  }

  eliminarDiagnostico(id: number): void {
    this.diagnosticoService.delete(id).subscribe(() => {
      this.listarDiagnosticos();
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
