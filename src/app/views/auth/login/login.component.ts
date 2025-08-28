import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthStore } from '../../../../core/auth/auth.store';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private store = inject(AuthStore);
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder){}
  forms = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit() {
    // this.loading.set(true); this.error.set(null);
    const body = this.forms.value;
       
    this.auth.login(body.username || '', body.password || '').subscribe({
      next: (res) => {
        if(res){
          this.router.navigateByUrl('/admin');
        }
      }
    })
  }
}
