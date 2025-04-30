import { Component, OnInit, ViewChild, ViewChildren, QueryList, OnChanges, SimpleChange } from '@angular/core';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartDialogComponent } from '../../components/add-to-cart-dialog/add-to-cart-dialog.component';

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

  center = { lat: 44.753171, lng: 20.503235 };
  zoom = 12;

  motos: any[] = [];
  selectedMoto: any = null;
  motoMarkers: MotoMarker[] = [];

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren(MapMarker) markerRefs!: QueryList<MapMarker>; // <--- добавил нормальное ViewChildren на маркеры


  constructor(private cartService: CartService, private dialog: MatDialog) {}
  addToCart(moto: any) {
    this.cartService.addToCart(moto);
    const dialogRef = this.dialog.open(AddToCartDialogComponent, {
      data: { moto }
    });
  }

  ngOnInit(): void {
    const radius = 9000;
    this.generateRandomMotos(40, this.center, radius);
  }

  private _activeTypes: string[] = [];

  @Input()
  set activeTypes(value: string[]) {
    this._activeTypes = value;
    this.filterMarkers(); // <-- сразу пересоздаем маркеры
  }

  get activeTypes(): string[] {
    return this._activeTypes;
  }

  filterMarkers() {
    if (!this.markerRefs) return;
    this.markerRefs.forEach((marker, index) => {
      
      const moto = this.motos[index];
      if (!moto) return;
      const fullNameMarker = `${moto.brand}`;
      if (this.activeTypes.includes(moto.type)) {
        marker.marker?.setIcon(moto.icon);
        marker.marker?.setLabel(fullNameMarker);
        this.selectedMoto = moto;
        this.infoWindow.open(marker);
      } else {
        // Убираем маркеры, которые не выбраны
        marker.marker?.setIcon("assets/images/empty.svg");
        marker.marker?.setLabel(null);  // Убираем маркеры с карты
      }
    });
  };


  generateRandomMotos(count: number, center: { lat: number, lng: number }, radiusMeters: number) {
    const brands: { [key: string]: {id: number; model: string; hourlyRate: number; imageUrl: string; icon: google.maps.Icon; type: string; location: string; isAvailable: boolean; description: string } } = {
      "Yamaha R6": {
        id: 1,
        model: 'R6',
        hourlyRate: 20,
        imageUrl: 'assets/images/yamaha_r6.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Sport',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Lightweight supersport bike with razor-sharp handling and high-revving engine.'
      },
      "Kawasaki ZX6RR": {
        id: 2,
        model: 'ZX6RR',
        hourlyRate: 22,
        imageUrl: 'assets/images/kawasaki_zx6rr.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Sport',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Track-ready motorcycle with aggressive design and performance-oriented features.'
      },
      "Suzuki Hayabusa": {
        id: 3,
        model: 'Hayabusa',
        hourlyRate: 30,
        imageUrl: 'assets/images/hayabusa.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Sport',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Legendary high-speed cruiser with unmatched stability and power.'
      },
      "BMW S1000RR": {
        id: 4,
        model: 'S1000RR',
        hourlyRate: 34,
        imageUrl: 'assets/images/s1000rr.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Sport',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Premium German engineering with race-spec performance and advanced electronics.'
      },
      "Honda CBR1000RR-R": {
        id: 6,
        model: 'CBR1000RR-R',
        hourlyRate: 26,
        imageUrl: 'assets/images/cbr1000rrr.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Sport',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Precision superbike from Honda with MotoGP DNA.'
      },
      "Honda CB500F": {
        id: 7,
        model: 'CB500F',
        hourlyRate: 18,
        imageUrl: 'assets/images/cb500f.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Naked',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Urban-friendly middleweight bike with comfort and style.'
      },
      "Triumph 765RS": {
        id: 8,
        model: '765RS',
        hourlyRate: 23,
        imageUrl: 'assets/images/765rs.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Naked',
        location: 'Belgrade',
        isAvailable: true,
        description: 'British streetfighter with responsive throttle and sharp handling.'
      },
      "BMW S1000R": {
        id: 9,
        model: 'S1000R',
        hourlyRate: 30,
        imageUrl: 'assets/images/s1000r.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Naked',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Dynamic naked bike with superb power-to-weight ratio and tech.'
      },
      "Yamaha MT09": {
        id: 10,
        model: 'MT09',
        hourlyRate: 22,
        imageUrl: 'assets/images/mt09.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Naked',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Torque-heavy street machine with aggressive looks and agile performance.'
      },
      "Kawasaki Vulcan S": {
        id: 12,
        model: 'Vulcan S',
        hourlyRate: 20,
        imageUrl: 'assets/images/vulcan.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Chopper',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Beginner-friendly cruiser with customizable ergonomics.'
      },
      "Honda Shadow 750": {
        id: 13,
        model: 'Shadow 750',
        hourlyRate: 19,
        imageUrl: 'assets/images/shadow.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Chopper',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Classic V-twin cruiser with laid-back riding style.'
      },
      "Honda GoldWing": {
        id: 15,
        model: 'GoldWing',
        hourlyRate: 40,
        imageUrl: 'assets/images/goldwing.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Touring',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Luxury touring machine with top-level comfort and performance.'
      },
      "BMW GS1250": {
        id: 16,
        model: 'GS1250',
        hourlyRate: 38,
        imageUrl: 'assets/images/gs1250.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Touring',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Adventure-ready bike for both tarmac and off-road journeys.'
      },
      "BMW R1250RT": {
        id: 17,
        model: 'R1250RT',
        hourlyRate: 36,
        imageUrl: 'assets/images/rt1250.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Touring',
        location: 'Belgrade',
        isAvailable: true,
        description: 'Sport-touring beast with dynamic suspension and comfort tech.'
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
        id: brands[randomBrand].id,
        brand: randomBrand,
        model: brands[randomBrand].model,
        hourlyRate: brands[randomBrand].hourlyRate,
        imageUrl: brands[randomBrand].imageUrl,
        lat: motoLat,
        lng: motoLng,
        icon: brands[randomBrand].icon,
        type: brands[randomBrand].type
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
    this.markerRefs.forEach((marker, index) => {
      
      const moto = this.motos[index];
      if (!moto) return;
  
      const fullNameMarker = `${moto.brand}`;
      const fullNameSelected = `${selectedMoto.brand} ${selectedMoto.model}`;
  
      if (fullNameMarker === fullNameSelected) {
        // Подсвечиваем выбранный маркер
        const highlightedIcon = {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(50, 50),
          labelOrigin: new google.maps.Point(25, 60)
        };
        marker.marker?.setIcon(highlightedIcon);
        marker.marker?.setLabel(fullNameSelected);
        this.selectedMoto = moto;
        this.infoWindow.open(marker);
      } else {
        // Убираем маркеры, которые не выбраны
        marker.marker?.setIcon("assets/images/empty.svg");
        marker.marker?.setLabel(null);  // Убираем маркеры с карты
      }
    });
  }
}