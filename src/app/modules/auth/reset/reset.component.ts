import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  form = new FormGroup(
    {
      passwordResetToken: new FormControl(undefined, Validators.required),
      password: new FormControl(undefined, [Validators.required]),
      repeatPassword: new FormControl(undefined, [Validators.required])
    },
    Validators.required
  );
  error: string;

  ngOnInit(): void {}

  public resetPassword(): void {
    this.auth.changePassword(this.form.value).subscribe(
      response => {
        this.router.navigateByUrl('/auth/Login');
      },
      error => {
        console.log(error.error);
        this.error = error.statusText;
      }
    );
  }
}
