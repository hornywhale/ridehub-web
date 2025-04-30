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
      hourlyRate: 20,
      imageUrl: 'assets/images/yamaha_r6.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Sport',
      description: 'Lightweight supersport bike with razor-sharp handling and high-revving engine.'
    },
    {
      id: 2,
      brand: 'Kawasaki',
      model: 'ZX6RR',
      hourlyRate: 22,
      imageUrl: 'assets/images/kawasaki_zx6rr.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Sport',
      description: 'Track-ready motorcycle with aggressive design and performance-oriented features.'
    },
    {
      id: 3,
      brand: 'Suzuki',
      model: 'Hayabusa',
      hourlyRate: 30,
      imageUrl: 'assets/images/hayabusa.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Sport',
      description: 'Legendary high-speed cruiser with unmatched stability and power.'
    },
    {
      id: 4,
      brand: 'BMW',
      model: 'S1000RR',
      hourlyRate: 34,
      imageUrl: 'assets/images/s1000rr.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Sport',
      description: 'Premium German engineering with race-spec performance and advanced electronics.'
    },
    {
      id: 5,
      brand: 'KTM',
      model: '990 RC-R',
      hourlyRate: 25,
      imageUrl: 'assets/images/990rcr.jpg',
      location: 'Belgrade',
      isAvailable: false,
      type: 'Sport',
      description: 'Austrian-built race machine with a powerful V-twin and aggressive styling.'
    },
    {
      id: 6,
      brand: 'Honda',
      model: 'CBR1000RR-R',
      hourlyRate: 26,
      imageUrl: 'assets/images/cbr1000rrr.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Sport',
      description: 'Precision superbike from Honda with MotoGP DNA.'
    },
    {
      id: 7,
      brand: 'Honda',
      model: 'CB500F',
      hourlyRate: 18,
      imageUrl: 'assets/images/cb500f.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Naked',
      description: 'Urban-friendly middleweight bike with comfort and style.'
    },
    {
      id: 8,
      brand: 'Triumph',
      model: '765rs',
      hourlyRate: 23,
      imageUrl: 'assets/images/765rs.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Naked',
      description: 'British streetfighter with responsive throttle and sharp handling.'
    },
    {
      id: 9,
      brand: 'BMW',
      model: 'S1000R',
      hourlyRate: 30,
      imageUrl: 'assets/images/s1000r.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Naked',
      description: 'Dynamic naked bike with superb power-to-weight ratio and tech.'
    },
    {
      id: 10,
      brand: 'Yamaha',
      model: 'MT09',
      hourlyRate: 22,
      imageUrl: 'assets/images/mt09.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Naked',
      description: 'Torque-heavy street machine with aggressive looks and agile performance.'
    },
    {
      id: 11,
      brand: 'KTM',
      model: 'SuperDuke 1290',
      hourlyRate: 18,
      imageUrl: 'assets/images/superduke.jpg',
      location: 'Belgrade',
      isAvailable: false,
      type: 'Naked',
      description: 'The "Beast"— raw power and dominating road presence.'
    },
    {
      id: 12,
      brand: 'Kawasaki',
      model: 'Vulcan S',
      hourlyRate: 20,
      imageUrl: 'assets/images/vulcan.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Chopper',
      description: 'Beginner-friendly cruiser with customizable ergonomics.'
    },
    {
      id: 13,
      brand: 'Honda',
      model: 'Shadow 750',
      hourlyRate: 19,
      imageUrl: 'assets/images/shadow.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Chopper',
      description: 'Classic V-twin cruiser with laid-back riding style.'
    },
    {
      id: 14,
      brand: 'Harley',
      model: 'FatBob',
      hourlyRate: 39,
      imageUrl: 'assets/images/harley.jpg',
      location: 'Belgrade',
      isAvailable: false,
      type: 'Chopper',
      description: 'Iconic American muscle with signature exhaust rumble and attitude.'
    },
    {
      id: 15,
      brand: 'Honda',
      model: 'GoldWing',
      hourlyRate: 40,
      imageUrl: 'assets/images/goldwing.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Touring',
      description: 'Luxury touring machine with top-level comfort and performance.'
    },
    {
      id: 16,
      brand: 'BMW',
      model: 'GS1250',
      hourlyRate: 38,
      imageUrl: 'assets/images/gs1250.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Touring',
      description: 'Adventure-ready bike for both tarmac and off-road journeys.'
    },
    {
      id: 17,
      brand: 'BMW',
      model: 'R1250RT',
      hourlyRate: 36,
      imageUrl: 'assets/images/rt1250.jpg',
      location: 'Belgrade',
      isAvailable: true,
      type: 'Touring',
      description: 'Sport-touring beast with dynamic suspension and comfort tech.'
    },
  ];

  getAllMotos(): Moto[] {
    return this.motos;
  }
}