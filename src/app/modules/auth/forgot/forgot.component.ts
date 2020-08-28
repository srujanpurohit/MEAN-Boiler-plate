import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  error: string;

  ngOnInit(): void {}

  public sendOtp(email): void {
    this.authService.forgot({ email }).subscribe(
      () => {
        this.error = null;
        this.router.navigateByUrl('/auth/Reset');
      },
      error => {
        this.error = error.statusText;
      }
    );
  }
}
