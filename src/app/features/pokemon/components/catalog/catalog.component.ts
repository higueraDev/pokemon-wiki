import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../../../models/entities/pokemon';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  @Input() pokemon$: Observable<Pokemon[]>;
  @Output() pokemonEmitter = new EventEmitter<Pokemon>();

  selectPokemon(pokemon: Pokemon) {
    this.pokemonEmitter.emit(pokemon);
  }
}
