import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Credentials } from '../../model/credentials';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  creds: Credentials = {
    username: "",
    password: ""
  };

  constructor(private loginService: LoginService, private router: Router) {}

  login(form: NgForm) {
    console.log('form value', form.value);
    this.loginService.login(this.creds).subscribe(response => {
      const token = this.loginService.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const roles = decodedToken.roles; // Asegúrate de que este sea el campo correcto

        if (roles.includes('Admin')) {
          this.router.navigate(['/admin/dashboard']);
        } else if (roles.includes('Medico')) {
          this.router.navigate(['/medico/dashboard']);
        } else if (roles.includes('Paciente')) {
          this.router.navigate(['/paciente/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }
}
