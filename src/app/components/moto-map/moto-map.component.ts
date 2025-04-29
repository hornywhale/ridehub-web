import { Component, OnInit, ViewChild, ViewChildren, QueryList, OnChanges, SimpleChange } from '@angular/core';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';

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


  constructor(private cartService: CartService) {}
  addToCart(moto: any) {
    this.cartService.addToCart(moto);
    alert('Мотоцикл добавлен в корзину! ✅');
  }

  ngOnInit(): void {
    const radius = 4500;
    this.generateRandomMotos(30, this.center, radius);
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
    const brands: { [key: string]: { model: string; hourlyRate: number; imageUrl: string; icon: google.maps.Icon; type: string }; } = {
      "Yamaha R6": {
        model: 'Yamaha R6',
        hourlyRate: 20,
        imageUrl: 'assets/images/yamaha_r6.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Sport'
      },
      "Kawasaki ZX6RR": {
        model: 'Kawasaki ZX6RR',
        hourlyRate: 22,
        imageUrl: 'assets/images/kawasaki_zx6rr.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Sport'
      },
      "Honda CBR1000RR-R": {
        model: 'Honda CBR1000RR-R',
        hourlyRate: 25,
        imageUrl: 'assets/images/cbr1000rrr.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Sport'
      },
      "Suzuki Hayabusa": {
        model: 'Suzuki Hayabusa',
        hourlyRate: 30,
        imageUrl: 'assets/images/hayabusa.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Sport'
      },
      "BMW S1000RR": {
        model: 'BMW S1000RR',
        hourlyRate: 35,
        imageUrl: 'assets/images/s1000rr.jpg',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          scaledSize: new google.maps.Size(32, 32),
          labelOrigin: new google.maps.Point(16, 40)
        },
        type: 'Naked'
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