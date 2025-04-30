import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel, MatOption } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Для dropdown

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatLabel, MatButtonModule, MatInputModule, MatCardModule, MatSelectModule, RouterLink]
})
export class ProfileComponent implements OnInit {
  user: any = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    favoriteType: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = { ...currentUser };
    } else {
      // Если не залогинен — кидаем на логин
      this.router.navigate(['/login']);
    }
  }

  saveProfile() {
    // Перезаписываем в localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.email === this.user.email ? this.user : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('motoFlowUser', JSON.stringify(this.user));
    alert('Профиль обновлён!');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}