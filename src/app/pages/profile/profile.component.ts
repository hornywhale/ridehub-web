import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [FormsModule]
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