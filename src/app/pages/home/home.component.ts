import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MotoCardComponent } from "../../components/moto-card/moto-card.component";
import { MotoService } from '../../services/moto.service';
import { Moto } from '../../models/moto.model';
import { NgFor } from '@angular/common';
import { MotoMapComponent } from "../../components/moto-map/moto-map.component"; // нужно для *ngFor
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule, MatButtonModule, RouterModule, MotoCardComponent, NgFor, MotoMapComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(MotoMapComponent) mapComponent!: MotoMapComponent;
  onRentMoto(moto: any) {
    console.log('Аренда мотоцикла:', moto);
    this.mapComponent.highlightOnlySelectedMarker(moto);
  }
  motos: Moto[] = [];

  constructor(private motoService: MotoService) {}
  categories = [
    { name: 'Sport', checked: true },
    { name: 'Naked', checked: true },
    { name: 'Chopper', checked: true },
    { name: 'Touring', checked: true }
  ];
  
  filteredMotos: any[] = [];
  
  ngOnInit(): void {
    this.motos = this.motoService.getAllMotos();
    this.updateFilteredMotos();
  }
  selectedTypes: string[] = [];
  updateFilteredMotos() {
    const selectedCategories = this.categories.filter(c => c.checked).map(c => c.name);
    this.selectedTypes = [...selectedCategories];
    this.filteredMotos = this.motos.filter(moto => selectedCategories.includes(moto.type));
  }
}
