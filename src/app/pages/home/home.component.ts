import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MotoCardComponent } from "../../components/moto-card/moto-card.component";
import { MotoService } from '../../services/moto.service';
import { Moto } from '../../models/moto.model';
import { NgFor, NgIf } from '@angular/common';
import { MotoMapComponent } from "../../components/moto-map/moto-map.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    RouterModule,
    MotoCardComponent,
    NgFor,
    NgIf,
    MotoMapComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('mapSection') mapSection!: ElementRef;
  @ViewChild(MotoMapComponent) mapComponent!: MotoMapComponent;

  motos: Moto[] = [];
  filteredMotos: Moto[] = [];

  selectedSort: string = 'price';
  sortOrder: string = 'asc';

  categories = [
    { name: 'Sport', checked: true },
    { name: 'Naked', checked: true },
    { name: 'Chopper', checked: true },
    { name: 'Touring', checked: true }
  ];

  selectedTypes: string[] = [];

  constructor(private motoService: MotoService) {}

  ngOnInit(): void {
    this.motos = this.motoService.getAllMotos();
    this.updateFilteredMotos();
  }

  updateFilteredMotos() {
    const selectedCategories = this.categories.filter(c => c.checked).map(c => c.name);
    this.selectedTypes = [...selectedCategories];
    this.filteredMotos = this.motos.filter(moto => selectedCategories.includes(moto.type));
    this.sortMotos();
  }

  sortMotos() {
    if (this.selectedSort === 'price') {
      this.filteredMotos.sort((a, b) =>
        this.sortOrder === 'asc' ? a.hourlyRate - b.hourlyRate : b.hourlyRate - a.hourlyRate
      );
    } else if (this.selectedSort === 'brand') {
      this.filteredMotos.sort((a, b) =>
        this.sortOrder === 'asc'
          ? a.brand.localeCompare(b.brand)
          : b.brand.localeCompare(a.brand)
      );
    }
  }

  onSortChange() {
    this.sortMotos();
  }

  onSortOrderChange() {
    this.sortMotos();
  }

  onRentMoto(moto: Moto) {
    console.log('Аренда мотоцикла:', moto);
    this.mapComponent.highlightOnlySelectedMarker(moto);
    setTimeout(() => {
      this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100); // таймаут чтобы карта точно прогрузилась
  }

  onCategoryChange() {
    this.updateFilteredMotos();
  }
}
