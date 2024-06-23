import { Component, OnInit, ViewChild } from '@angular/core';
import { Diagnostico } from '../../../model/diagnostico';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-ver-diagnosticos',
  templateUrl: './medico-ver-diagnosticos.component.html',
  styleUrl: './medico-ver-diagnosticos.component.css'
})
export class MedicoVerDiagnosticosComponent implements OnInit {
  displayedColumns: string[] = ['descripcion', 'receta', 'tratamiento', 'acciones'];
  dataSource = new MatTableDataSource<Diagnostico>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private diagnosticoService: DiagnosticoService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    this.diagnosticoService.listarPorMedico(username).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching diagnosticos data', error);
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

  editarDiagnostico(id: number): void {
    this.router.navigate(['/medico/editar-diagnostico', id]);
  }
}