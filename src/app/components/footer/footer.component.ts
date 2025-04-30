import { Component } from '@angular/core';
import { MatListModule, MatListItem } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule, MatListModule, MatListItem, MatButtonModule, RouterModule]
})
export class FooterComponent {}