import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  error: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user.pipe(take(1)).subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/');
      }
    });
  }

  login(): void {
    this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        this.error = error.statusText;
      }
    );
  }
}
