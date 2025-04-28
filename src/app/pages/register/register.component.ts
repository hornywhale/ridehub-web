import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  phone = '';
  address = '';
  favoriteType = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const success = this.authService.register({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      favoriteType: this.favoriteType
    });

    if (success) {
      alert('Регистрация успешна!');
      this.router.navigate(['/login']);
    } else {
      alert('Пользователь с таким email уже существует!');
    }
  }
}