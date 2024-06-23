import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { PacientesPerfilComponent } from './components/pacientes/pacientes-perfil/pacientes-perfil.component';
import { PacientesEditarPerfilComponent } from './components/pacientes/pacientes-editar-perfil/pacientes-editar-perfil.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacientesVerCitasComponent } from './components/pacientes/pacientes-ver-citas/pacientes-ver-citas.component';
import { PacientesModificarCitaComponent } from './components/pacientes/pacientes-modificar-cita/pacientes-modificar-cita.component';
import { PacientesCancelarCitaComponent } from './components/pacientes/pacientes-cancelar-cita/pacientes-cancelar-cita.component';
import { PacientesVerMedicosDisponiblesComponent } from './components/pacientes/pacientes-ver-medicos-disponibles/pacientes-ver-medicos-disponibles.component';
import { PacientesRegistrarCitaComponent } from './components/pacientes/pacientes-registrar-cita/pacientes-registrar-cita.component';
import { PacientesVerDiagnosticosComponent } from './components/pacientes/pacientes-ver-diagnosticos/pacientes-ver-diagnosticos.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { MedicosPerfilComponent } from './components/medicos/medicos-perfil/medicos-perfil.component';
import { MedicosEditarPerfilComponent } from './components/medicos/medicos-editar-perfil/medicos-editar-perfil.component';
import { MedicosVerCitasComponent } from './components/medicos/medicos-ver-citas/medicos-ver-citas.component';
import { MedicosRegistrarDiagnosticoComponent } from './components/medicos/medicos-registrar-diagnostico/medicos-registrar-diagnostico.component';
import { MedicosModificarDiagnosticoComponent } from './components/medicos/medicos-modificar-diagnostico/medicos-modificar-diagnostico.component';
import { MedicosEliminarDiagnosticoComponent } from './components/medicos/medicos-eliminar-diagnostico/medicos-eliminar-diagnostico.component';
import { MedicosVerPacientesComponent } from './components/medicos/medicos-ver-pacientes/medicos-ver-pacientes.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminVerPacientesComponent } from './components/admin/admin-ver-pacientes/admin-ver-pacientes.component';
import { AdminRegistrarPacienteComponent } from './components/admin/admin-registrar-paciente/admin-registrar-paciente.component';
import { AdminModificarPacienteComponent } from './components/admin/admin-modificar-paciente/admin-modificar-paciente.component';
import { AdminVerMedicosComponent } from './components/admin/admin-ver-medicos/admin-ver-medicos.component';
import { AdminRegistrarMedicoComponent } from './components/admin/admin-registrar-medico/admin-registrar-medico.component';
import { AdminModificarMedicoComponent } from './components/admin/admin-modificar-medico/admin-modificar-medico.component';
import { AdminEliminarMedicoComponent } from './components/admin/admin-eliminar-medico/admin-eliminar-medico.component';
import { AdminVerCitasComponent } from './components/admin/admin-ver-citas/admin-ver-citas.component';
import { AdminRegistrarCitaComponent } from './components/admin/admin-registrar-cita/admin-registrar-cita.component';
import { AdminModificarCitaComponent } from './components/admin/admin-modificar-cita/admin-modificar-cita.component';
import { AdminEliminarCitaComponent } from './components/admin/admin-eliminar-cita/admin-eliminar-cita.component';
import { AdminVerDiagnosticosComponent } from './components/admin/admin-ver-diagnosticos/admin-ver-diagnosticos.component';
import { AdminRegistrarDiagnosticoComponent } from './components/admin/admin-registrar-diagnostico/admin-registrar-diagnostico.component';
import { AdminModificarDiagnosticoComponent } from './components/admin/admin-modificar-diagnostico/admin-modificar-diagnostico.component';
import { AdminEliminarDiagnosticoComponent } from './components/admin/admin-eliminar-diagnostico/admin-eliminar-diagnostico.component';
import { AdminVerUsuariosComponent } from './components/admin/admin-ver-usuarios/admin-ver-usuarios.component';
import { AdminBuscarUsuarioComponent } from './components/admin/admin-buscar-usuario/admin-buscar-usuario.component';
import { AdminListarUsuariosPorRolComponent } from './components/admin/admin-listar-usuarios-por-rol/admin-listar-usuarios-por-rol.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardGuard } from './security/auth-guard.guard';
import { TokenInterceptor } from './services/token.interceptor';
import { PacienteDashboardComponent } from './components/pacientes/paciente-dashboard/paciente-dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MedicoDashboardComponent } from './components/medicos/medico-dashboard/medico-dashboard.component';
import { MedicoVerDiagnosticosComponent } from './components/medicos/medico-ver-diagnosticos/medico-ver-diagnosticos.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SobreNosotrosComponent,
    ContactoComponent,
    ServiciosComponent,
    PacientesPerfilComponent,
    PacientesEditarPerfilComponent,
    PacientesComponent,
    PacientesVerCitasComponent,
    PacientesModificarCitaComponent,
    PacientesCancelarCitaComponent,
    PacientesVerMedicosDisponiblesComponent,
    PacientesRegistrarCitaComponent,
    PacientesVerDiagnosticosComponent,
    MedicosComponent,
    MedicosPerfilComponent,
    MedicosEditarPerfilComponent,
    MedicosVerCitasComponent,
    MedicosRegistrarDiagnosticoComponent,
    MedicosModificarDiagnosticoComponent,
    MedicosEliminarDiagnosticoComponent,
    MedicosVerPacientesComponent,
    AdminComponent,
    AdminVerPacientesComponent,
    AdminRegistrarPacienteComponent,
    AdminModificarPacienteComponent,
    AdminVerMedicosComponent,
    AdminRegistrarMedicoComponent,
    AdminModificarMedicoComponent,
    AdminEliminarMedicoComponent,
    AdminVerCitasComponent,
    AdminRegistrarCitaComponent,
    AdminModificarCitaComponent,
    AdminEliminarCitaComponent,
    AdminVerDiagnosticosComponent,
    AdminRegistrarDiagnosticoComponent,
    AdminModificarDiagnosticoComponent,
    AdminEliminarDiagnosticoComponent,
    AdminVerUsuariosComponent,
    AdminBuscarUsuarioComponent,
    AdminListarUsuariosPorRolComponent,
    AdminDashboardComponent,
    ConfirmDialogComponent,
    LoginComponent,
    PacienteDashboardComponent,
    MedicoDashboardComponent,
    MedicoVerDiagnosticosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatCardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
