import { Injectable } from '@angular/core';
import { Moto } from '../models/moto.model';

@Injectable({
  providedIn: 'root'
})
export class MotoService {
  motos: Moto[] = [
    {
      id: 1,
      brand: 'Yamaha',
      model: 'R6',
      hourlyRate: 15,
      imageUrl: 'assets/images/yamaha_r6.jpg',
      location: 'Белград, Центр',
      isAvailable: true
    },
    {
      id: 2,
      brand: 'Kawasaki',
      model: 'ZX6RR',
      hourlyRate: 18,
      imageUrl: 'assets/images/kawasaki_zx6rr.jpg',
      location: 'Белград, Новый Белград',
      isAvailable: false
    }
  ];

  getAllMotos(): Moto[] {
    return this.motos;
  }
}