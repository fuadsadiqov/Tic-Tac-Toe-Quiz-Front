import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthStore } from '../../../../core/auth/auth.store';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../../core/auth/auth.types';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private fb: FormBuilder, private toast: ToastrService){}
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
          if(res.user?.role === Role.Admin){
            this.router.navigateByUrl('/admin');
          }
          else{
            this.toast.warning("You have not permission!")
          }
        }
      }
    })
  }
}
