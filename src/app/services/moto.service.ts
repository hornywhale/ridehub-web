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
      isAvailable: true,
      type: "Sport"
    },
    {
      id: 2,
      brand: 'Kawasaki',
      model: 'ZX6RR',
      hourlyRate: 18,
      imageUrl: 'assets/images/kawasaki_zx6rr.jpg',
      location: 'Белград, Новый Белград',
      isAvailable: true,
      type: "Sport"
    },
    {
      id: 3,
      brand: 'Suzuki',
      model: 'Hayabusa',
      hourlyRate: 30,
      imageUrl: 'assets/images/hayabusa.jpg',
      location: 'Белград, Новый Белград',
      isAvailable: true,
      type: "Sport"
    },
    {
      id: 4,
      brand: 'BMW',
      model: 'S1000RR',
      hourlyRate: 35,
      imageUrl: 'assets/images/s1000rr.jpg',
      location: 'Белград, Новый Белград',
      isAvailable: true,
      type: "Sport"
    },
    {
      id: 5,
      brand: 'KTM',
      model: '990 RC-R',
      hourlyRate: 25,
      imageUrl: 'assets/images/990rcr.jpg',
      location: 'Белград, Новый Белград',
      isAvailable: false,
      type: "Sport"
    },
    {
      id: 6,
      brand: 'Honda',
      model: 'CBR1000RR-R',
      hourlyRate: 18,
      imageUrl: 'assets/images/cbr1000rrr.jpg',
      location: 'Белград, Новый Белград',
      isAvailable: true,
      type: "Sport"
    }
  ];

  getAllMotos(): Moto[] {
    return this.motos;
  }
}