import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) {}

  public close() {
    this.loginService.closeSession();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.loginService.getToken() !== null;
  }

  ngOnInit(): void {}
}
