import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../shared/services/auth.service';
import { tap } from 'rxjs/operators'
import AuthData from 'src/app/shared/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public loginForm!: FormGroup;
  public loginFalse!: boolean;
  private usuario = localStorage.getItem('usuario');

  @ViewChild('form', {static: false}) form!: ElementRef<HTMLFormElement>;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm(): void {
    this.loginForm = this.fb.group({
      usuario: [this.usuario, Validators.required],
      password: [null, Validators.required],
      recuerdame: [this.usuario ? true : false],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      for (const i in this.loginForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.loginForm.controls, i)) {
          const control = this.loginForm.controls[i];
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      }

      this.form.nativeElement.classList.add('was-validated');

      return;
    }

    const authData: AuthData = this.loginForm.value;

    const result = this.authService.login(authData);

    if(!result){
      this.loginFalse = true;
      return;
    }

    if(authData.recuerdame){
      localStorage.setItem('usuario', authData.usuario);
    }else{
      localStorage.removeItem('usuario');
    }
  }
}
