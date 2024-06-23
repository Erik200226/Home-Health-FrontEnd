export class DiagnosticoResponse {
    id: number = 0;
    descripcion: string = '';
    receta: string = '';
    tratamiento: string = '';
    fechaCita: Date = new Date();
    nombrePaciente: string = '';
    dniPaciente: string = '';
    nombreMedico: string = '';
}
