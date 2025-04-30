import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'motoFlowUser';

  constructor() {}

  register(user: any): boolean {
    const existingUsers = this.getAllUsers();
    if (existingUsers.find((u: any) => u.email === user.email)) {
      return false; // Пользователь с таким email уже существует
    }
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getAllUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      localStorage.setItem('currentUser', user.email); // сохраняем только email, не весь объект
      return true;
    }
    return false;
  }

  logout() {
    localStorage.setItem('currentUser', "");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getCurrentUser() {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

  private getAllUsers(): any[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
}