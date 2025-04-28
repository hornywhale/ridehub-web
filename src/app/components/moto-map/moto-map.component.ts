// import { Component, OnInit, ViewChild } from '@angular/core';
// import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-moto-map',
//   templateUrl: './moto-map.component.html',
//   styleUrls: ['./moto-map.component.css'],
//   standalone: true,
//   imports: [GoogleMap, MapMarker, CommonModule, MapInfoWindow, MatButtonModule]
// })
// export class MotoMapComponent implements OnInit {
//   center = { lat: 44.780722, lng: 20.482389 }; // Центр карты
//   zoom = 12;

//   motos: any[] = []; // Массив с мотоциклами
//   selectedMoto: any = null; // Мотоцикл, выбранный для отображения в попапе
//   @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow; // Попап

//   ngOnInit(): void {
//     const radius = 4500; // 4.5 км
//     this.generateRandomMotos(30, this.center, radius); // Генерация мотоциклов
//   }

//   generateRandomMotos(count: number, center: { lat: number, lng: number }, radiusMeters: number) {
//     // Массив брендов с их данными
//     const brands: {
//       [key: string]: {  // Ключ - это строка, значение - объект с данными мотоцикла
//         model: string;
//         hourlyRate: number;
//         imageUrl: string;
//         icon: google.maps.Icon;
//       };
//     } = {
//       "Yamaha R6": {
//         model: 'Yamaha R6',
//         hourlyRate: 20,
//         imageUrl: 'assets/images/bike1.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//           labelOrigin: {
//             x: 16, y: 40,
//             equals: function (other: google.maps.Point | null): boolean {
//               throw new Error('Function not implemented.');
//             }
//           },
//           scaledSize: new google.maps.Size(32, 32)
//         }
//       },
//       "Kawasaki ZX6RR": {
//         model: 'Kawasaki ZX6RR',
//         hourlyRate: 22,
//         imageUrl: 'assets/images/bike2.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
//           labelOrigin: {
//             x: 16, y: 40,
//             equals: function (other: google.maps.Point | null): boolean {
//               throw new Error('Function not implemented.');
//             }
//           },
//           scaledSize: new google.maps.Size(32, 32)
//         }
//       },
//       "Honda CBR1000RR-R": {
//         model: 'Honda CBR1000RR-R',
//         hourlyRate: 25,
//         imageUrl: 'assets/images/bike3.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
//           labelOrigin: {
//             x: 16, y: 40,
//             equals: function (other: google.maps.Point | null): boolean {
//               throw new Error('Function not implemented.');
//             }
//           },
//           scaledSize: new google.maps.Size(32, 32)
//         }
//       },
//       "Suzuki Hayabusa": {
//         model: 'Suzuki Hayabusa',
//         hourlyRate: 30,
//         imageUrl: 'assets/images/bike4.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
//           labelOrigin: {
//             x: 16, y: 40,
//             equals: function (other: google.maps.Point | null): boolean {
//               throw new Error('Function not implemented.');
//             }
//           },
//           scaledSize: new google.maps.Size(32, 32)
//         }
//       },
//       "BMW S1000RR": {
//         model: 'BMW S1000RR',
//         hourlyRate: 35,
//         imageUrl: 'assets/images/bike5.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
//           labelOrigin: {
//             x: 16, y: 40,
//             equals: function (other: google.maps.Point | null): boolean {
//               throw new Error('Function not implemented.');
//             }
//           },
//           scaledSize: new google.maps.Size(32, 32)
//         }
//       }
//     };
  
//     const earthRadius = 6371000; // Радиус Земли в метрах
  
//     for (let i = 0; i < count; i++) {
//       const brandNames = Object.keys(brands);  // Получаем все имена брендов
//       const randomBrand = brandNames[Math.floor(Math.random() * brandNames.length)] as keyof typeof brands;  // Строгая типизация
  
//       const distance = Math.random() * radiusMeters;
//       const angle = Math.random() * 2 * Math.PI;
  
//       const deltaLat = (distance * Math.cos(angle)) / earthRadius;
//       const deltaLng = (distance * Math.sin(angle)) / (earthRadius * Math.cos(center.lat * Math.PI / 180));
  
//       const motoLat = center.lat + deltaLat * (180 / Math.PI);
//       const motoLng = center.lng + deltaLng * (180 / Math.PI);
  
//       this.motos.push({
//         id: i + 1,
//         brand: randomBrand,
//         model: brands[randomBrand].model,
//         hourlyRate: brands[randomBrand].hourlyRate,
//         imageUrl: brands[randomBrand].imageUrl,
//         lat: motoLat,
//         lng: motoLng,
//         icon: brands[randomBrand].icon
//       });
//     }
//   }

//   openInfoWindow(marker: MapMarker, moto: any) {
//     this.selectedMoto = moto;
//     this.infoWindow.open(marker);
//   }

//   constructor() { }
// }

// import { Component, OnInit, ViewChild } from '@angular/core';
// import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';

// // Тип для хранения пары мотоцикл + маркер
// interface MotoMarker {
//   moto: any;
//   marker: MapMarker;
// }

// @Component({
//   selector: 'app-moto-map',
//   templateUrl: './moto-map.component.html',
//   styleUrls: ['./moto-map.component.css'],
//   standalone: true,
//   imports: [GoogleMap, MapMarker, CommonModule, MapInfoWindow, MatButtonModule]
// })
// export class MotoMapComponent implements OnInit {
//   center = { lat: 44.780722, lng: 20.482389 };
//   zoom = 12;

//   motos: any[] = [];
//   selectedMoto: any = null;
//   motoMarkers: MotoMarker[] = [];

//   @ViewChild(GoogleMap) map!: GoogleMap;
//   @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
// marker: MapMarker;
// console: any;

//   constructor() {}

//   ngOnInit(): void {
//     const radius = 4500;
//     this.generateRandomMotos(30, this.center, radius);
//   }

//   generateRandomMotos(count: number, center: { lat: number, lng: number }, radiusMeters: number) {
//     const brands: { [key: string]: { model: string; hourlyRate: number; imageUrl: string; icon: google.maps.Icon; }; } = {
//       "Yamaha R6": {
//         model: 'Yamaha R6',
//         hourlyRate: 20,
//         imageUrl: 'assets/images/bike1.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//           scaledSize: new google.maps.Size(32, 32),
//           labelOrigin: new google.maps.Point(16, 40)
//         }
//       },
//       "Kawasaki ZX6RR": {
//         model: 'Kawasaki ZX6RR',
//         hourlyRate: 22,
//         imageUrl: 'assets/images/bike2.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
//           scaledSize: new google.maps.Size(32, 32),
//           labelOrigin: new google.maps.Point(16, 40)
//         }
//       },
//       "Honda CBR1000RR-R": {
//         model: 'Honda CBR1000RR-R',
//         hourlyRate: 25,
//         imageUrl: 'assets/images/bike3.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
//           scaledSize: new google.maps.Size(32, 32),
//           labelOrigin: new google.maps.Point(16, 40)
//         }
//       },
//       "Suzuki Hayabusa": {
//         model: 'Suzuki Hayabusa',
//         hourlyRate: 30,
//         imageUrl: 'assets/images/bike4.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
//           scaledSize: new google.maps.Size(32, 32),
//           labelOrigin: new google.maps.Point(16, 40)
//         }
//       },
//       "BMW S1000RR": {
//         model: 'BMW S1000RR',
//         hourlyRate: 35,
//         imageUrl: 'assets/images/bike5.jpg',
//         icon: {
//           url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
//           scaledSize: new google.maps.Size(32, 32),
//           labelOrigin: new google.maps.Point(16, 40)
//         }
//       }
//     };

//     const earthRadius = 6371000;

//     for (let i = 0; i < count; i++) {
//       const brandNames = Object.keys(brands);
//       const randomBrand = brandNames[Math.floor(Math.random() * brandNames.length)] as keyof typeof brands;

//       const distance = Math.random() * radiusMeters;
//       const angle = Math.random() * 2 * Math.PI;

//       const deltaLat = (distance * Math.cos(angle)) / earthRadius;
//       const deltaLng = (distance * Math.sin(angle)) / (earthRadius * Math.cos(center.lat * Math.PI / 180));

//       const motoLat = center.lat + deltaLat * (180 / Math.PI);
//       const motoLng = center.lng + deltaLng * (180 / Math.PI);

//       this.motos.push({
//         id: i + 1,
//         brand: randomBrand,
//         model: brands[randomBrand].model,
//         hourlyRate: brands[randomBrand].hourlyRate,
//         imageUrl: brands[randomBrand].imageUrl,
//         lat: motoLat,
//         lng: motoLng,
//         icon: brands[randomBrand].icon
//       });
//     }
//   }

//   openInfoWindow(marker: MapMarker, moto: any) {
//     this.selectedMoto = moto;
//     this.infoWindow.open(marker);
//   }

//   addMarker(marker: MapMarker, moto: any) {
//     console.log('Добавляю маркер:', moto);
//     this.motoMarkers.push({ marker, moto });
//   }

//   highlightOnlySelectedMarker(selectedMoto: any) {
//     console.log(this.motoMarkers);
//     this.motoMarkers.forEach(motoMarker => {
//       const fullNameMarker = `${motoMarker.moto.brand} ${motoMarker.moto.model}`;
//       const fullNameSelected = `${selectedMoto.brand} ${selectedMoto.model}`;
//       console.log(fullNameSelected);
//       console.log(fullNameMarker);
//       if (fullNameMarker === fullNameSelected) {
//         // Подсвечиваем маркер
//         const highlightedIcon = {
//           url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//           scaledSize: new google.maps.Size(50, 50),
//           labelOrigin: new google.maps.Point(25, 60)
//         };
//         motoMarker.marker.marker?.setIcon(highlightedIcon);

//         this.selectedMoto = motoMarker.moto;
//         this.infoWindow.open(motoMarker.marker);
//       } else {
//         // Возвращаем обычный серый маркер
//         const normalIcon = {
//           url: 'http://maps.google.com/mapfiles/ms/icons/grey-dot.png',
//           scaledSize: new google.maps.Size(32, 32),
//           labelOrigin: new google.maps.Point(16, 40)
//         };
//         motoMarker.marker.marker?.setIcon(normalIcon);
//       }
//     });
//   }
// }

import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

// Тип для хранения пары мотоцикл + маркер
interface MotoMarker {
  moto: any;
  marker: MapMarker | null;
}

@Component({
  selector: 'app-moto-map',
  templateUrl: './moto-map.component.html',
  styleUrls: ['./moto-map.component.css'],
  standalone: true,
  imports: [GoogleMap, MapMarker, CommonModule, MapInfoWindow, MatButtonModule]
})
export class MotoMapComponent implements OnInit {
  center = { lat: 44.780722, lng: 20.482389 };
  zoom = 12;

  motos: any[] = [];
  selectedMoto: any = null;
  motoMarkers: MotoMarker[] = [];

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren(MapMarker) markerRefs!: QueryList<MapMarker>; // <--- добавил нормальное ViewChildren на маркеры

  constructor() {}

  ngOnInit(): void {
    const radius = 4500;
    this.generateRandomMotos(30, this.center, radius);
  }

  generateRandomMotos(count: number, center: { lat: number, lng: number }, radiusMeters: number) {
    const brands: { [key: string]: { model: string; hourlyRate: number; imageUrl: string; icon: google.maps.Icon; }; } = {
      "Yamaha R6": {
        model: 'Yamaha R6',
        hourlyRate: 20,
        imageUrl: 'assets/images/bike1.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        }
      },
      "Kawasaki ZX6RR": {
        model: 'Kawasaki ZX6RR',
        hourlyRate: 22,
        imageUrl: 'assets/images/bike2.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        }
      },
      "Honda CBR1000RR-R": {
        model: 'Honda CBR1000RR-R',
        hourlyRate: 25,
        imageUrl: 'assets/images/bike3.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        }
      },
      "Suzuki Hayabusa": {
        model: 'Suzuki Hayabusa',
        hourlyRate: 30,
        imageUrl: 'assets/images/bike4.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        }
      },
      "BMW S1000RR": {
        model: 'BMW S1000RR',
        hourlyRate: 35,
        imageUrl: 'assets/images/bike5.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        }
      }
    };

    const earthRadius = 6371000;

    for (let i = 0; i < count; i++) {
      const brandNames = Object.keys(brands);
      const randomBrand = brandNames[Math.floor(Math.random() * brandNames.length)] as keyof typeof brands;

      const distance = Math.random() * radiusMeters;
      const angle = Math.random() * 2 * Math.PI;

      const deltaLat = (distance * Math.cos(angle)) / earthRadius;
      const deltaLng = (distance * Math.sin(angle)) / (earthRadius * Math.cos(center.lat * Math.PI / 180));

      const motoLat = center.lat + deltaLat * (180 / Math.PI);
      const motoLng = center.lng + deltaLng * (180 / Math.PI);

      const newMoto = {
        id: i + 1,
        brand: randomBrand,
        model: brands[randomBrand].model,
        hourlyRate: brands[randomBrand].hourlyRate,
        imageUrl: brands[randomBrand].imageUrl,
        lat: motoLat,
        lng: motoLng,
        icon: brands[randomBrand].icon
      };

      this.motos.push(newMoto);
      this.motoMarkers.push({ moto: newMoto, marker: null });
    }
  }

  openInfoWindow(marker: MapMarker, moto: any) {
    this.selectedMoto = moto;
    this.infoWindow.open(marker);
  }

  highlightOnlySelectedMarker(selectedMoto: any) {
    console.log('Выбран мото:', selectedMoto);
    console.log(this.markerRefs)
    // Перебираем маркеры
    this.markerRefs.forEach((marker, index) => {
      
      const moto = this.motos[index];
      if (!moto) return;
  
      const fullNameMarker = `${moto.brand}`;
      const fullNameSelected = `${selectedMoto.brand} ${selectedMoto.model}`;
      console.log(fullNameSelected)
  
      if (fullNameMarker === fullNameSelected) {
        // Подсвечиваем выбранный маркер
        const highlightedIcon = {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(50, 50),
          labelOrigin: new google.maps.Point(25, 60)
        };
        marker.marker?.setIcon(highlightedIcon);
        this.selectedMoto = moto;
        this.infoWindow.open(marker);
      } else {
        // Убираем маркеры, которые не выбраны
        marker.marker?.setMap(null);  // Убираем маркеры с карты
      }
    });
  }
}