import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel, MatOption } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Для dropdown

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatLabel, MatButtonModule, MatInputModule, MatCardModule, MatSelectModule]
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
      alert('Registration successful!');
      this.router.navigate(['/login']);
    } else {
      alert('User with this email already exists');
    }
  }
}