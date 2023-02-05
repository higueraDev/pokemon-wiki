import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../../models/entities/pokemon';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  @Input() pokemon: Pokemon;
  @Output() updateEmitter = new EventEmitter<void>();
  @Output() deleteEmitter = new EventEmitter<void>();

  update() {
    this.updateEmitter.emit();
  }

  delete() {
    this.deleteEmitter.emit();
  }
}
