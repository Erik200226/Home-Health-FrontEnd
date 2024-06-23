import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ServiciosComponent } from './components/servicios/servicios.component';

// Pacientes
import { PacientesPerfilComponent } from './components/pacientes/pacientes-perfil/pacientes-perfil.component';
import { PacientesEditarPerfilComponent } from './components/pacientes/pacientes-editar-perfil/pacientes-editar-perfil.component';
import { PacientesVerCitasComponent } from './components/pacientes/pacientes-ver-citas/pacientes-ver-citas.component';
import { PacientesModificarCitaComponent } from './components/pacientes/pacientes-modificar-cita/pacientes-modificar-cita.component';
import { PacientesCancelarCitaComponent } from './components/pacientes/pacientes-cancelar-cita/pacientes-cancelar-cita.component';
import { PacientesVerMedicosDisponiblesComponent } from './components/pacientes/pacientes-ver-medicos-disponibles/pacientes-ver-medicos-disponibles.component';
import { PacientesRegistrarCitaComponent } from './components/pacientes/pacientes-registrar-cita/pacientes-registrar-cita.component';
import { PacientesVerDiagnosticosComponent } from './components/pacientes/pacientes-ver-diagnosticos/pacientes-ver-diagnosticos.component';
import { PacienteDashboardComponent } from './components/pacientes/paciente-dashboard/paciente-dashboard.component';

// Médicos
import { MedicosPerfilComponent } from './components/medicos/medicos-perfil/medicos-perfil.component';
import { MedicosEditarPerfilComponent } from './components/medicos/medicos-editar-perfil/medicos-editar-perfil.component';
import { MedicosVerCitasComponent } from './components/medicos/medicos-ver-citas/medicos-ver-citas.component';
import { MedicosRegistrarDiagnosticoComponent } from './components/medicos/medicos-registrar-diagnostico/medicos-registrar-diagnostico.component';
import { MedicosModificarDiagnosticoComponent } from './components/medicos/medicos-modificar-diagnostico/medicos-modificar-diagnostico.component';
import { MedicosEliminarDiagnosticoComponent } from './components/medicos/medicos-eliminar-diagnostico/medicos-eliminar-diagnostico.component';
import { MedicosVerPacientesComponent } from './components/medicos/medicos-ver-pacientes/medicos-ver-pacientes.component';

// Administrador
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
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardGuard } from './security/auth-guard.guard';
import { AdminComponent } from './components/admin/admin.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { MedicoDashboardComponent } from './components/medicos/medico-dashboard/medico-dashboard.component';
import { MedicoVerDiagnosticosComponent } from './components/medicos/medico-ver-diagnosticos/medico-ver-diagnosticos.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuardGuard], 
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'ver-pacientes', component: AdminVerPacientesComponent },
      { path: 'registrar-paciente', component: AdminRegistrarPacienteComponent },
      { path: 'modificar-paciente/:id', component: AdminModificarPacienteComponent },
      { path: 'ver-medicos', component: AdminVerMedicosComponent },
      { path: 'registrar-medico', component: AdminRegistrarMedicoComponent },
      { path: 'modificar-medico/:id', component: AdminModificarMedicoComponent },
      { path: 'eliminar-medico/:id', component: AdminEliminarMedicoComponent },
      { path: 'ver-citas', component: AdminVerCitasComponent },
      { path: 'registrar-cita', component: AdminRegistrarCitaComponent },
      { path: 'modificar-cita/:id', component: AdminModificarCitaComponent },
      { path: 'eliminar-cita/:id', component: AdminEliminarCitaComponent },
      { path: 'ver-diagnosticos', component: AdminVerDiagnosticosComponent },
      { path: 'registrar-diagnostico', component: AdminRegistrarDiagnosticoComponent },
      { path: 'modificar-diagnostico/:id', component: AdminModificarDiagnosticoComponent },
      { path: 'eliminar-diagnostico/:id', component: AdminEliminarDiagnosticoComponent },
      { path: 'ver-usuarios', component: AdminVerUsuariosComponent },
      { path: 'buscar-usuario', component: AdminBuscarUsuarioComponent },
      { path: 'listar-usuarios-por-rol', component: AdminListarUsuariosPorRolComponent },
    ] 
  },
  { path: 'medico', 
    component: MedicosComponent, 
    canActivate: [AuthGuardGuard], 
    children: [
    { path: 'dashboard', component: MedicoDashboardComponent },
    { path: 'perfil', component: MedicosPerfilComponent },
    { path: 'editar-perfil', component: MedicosEditarPerfilComponent },
    { path: 'ver-citas', component: MedicosVerCitasComponent },
    { path: 'ver-diagnosticos', component: MedicoVerDiagnosticosComponent},
    { path: 'registrar-diagnostico/:id', component: MedicosRegistrarDiagnosticoComponent },
    { path: 'modificar-diagnostico/:id', component: MedicosModificarDiagnosticoComponent },
    { path: 'eliminar-diagnostico/:id', component: MedicosEliminarDiagnosticoComponent },
    { path: 'ver-pacientes', component: MedicosVerPacientesComponent }
  ]},
  { path: 'paciente', component: PacientesComponent, canActivate: [AuthGuardGuard], children: [
    { path: 'dashboard', component: PacienteDashboardComponent },
    { path: 'perfil', component: PacientesPerfilComponent },
    { path: 'editar-perfil', component: PacientesEditarPerfilComponent },
    { path: 'ver-citas', component: PacientesVerCitasComponent },
    { path: 'modificar-cita/:id', component: PacientesModificarCitaComponent },
    { path: 'cancelar-cita/:id', component: PacientesCancelarCitaComponent },
    { path: 'ver-medicos-disponibles', component: PacientesVerMedicosDisponiblesComponent },
    { path: 'registrar-cita/:id', component: PacientesRegistrarCitaComponent },
    { path: 'ver-diagnosticos', component: PacientesVerDiagnosticosComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
