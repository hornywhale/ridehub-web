import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Moto } from '../../models/moto.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moto-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './moto-card.component.html',
  styleUrls: ['./moto-card.component.css']
})
export class MotoCardComponent {
  @Input() moto: any;
  @Output() rent = new EventEmitter<any>();  // <-- Событие аренды

  onRentClick() {
    console.log('Клик на арендовать в карточке', this.moto);
    this.rent.emit(this.moto); // <-- Отправляем наружу выбранный мотоцикл
  }
}