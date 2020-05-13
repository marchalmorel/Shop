import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(value => {
      this.isAuthenticated = value
    });
  }

  logout(event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login'])
  }

}
