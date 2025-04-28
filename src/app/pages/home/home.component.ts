import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MotoCardComponent } from "../../components/moto-card/moto-card.component";
import { MotoService } from '../../services/moto.service';
import { Moto } from '../../models/moto.model';
import { NgFor } from '@angular/common';
import { MotoMapComponent } from "../../components/moto-map/moto-map.component"; // нужно для *ngFor


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule, MatButtonModule, RouterModule, MotoCardComponent, NgFor, MotoMapComponent],
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

  ngOnInit(): void {
    this.motos = this.motoService.getAllMotos();
    console.log('МОТОЦИКЛЫ:', this.motos); // <--- Добавь для отладки
  }
}
