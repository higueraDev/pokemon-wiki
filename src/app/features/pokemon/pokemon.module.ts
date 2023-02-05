import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { CatalogComponent } from './components/catalog/catalog.component';
import { DetailComponent } from './components/detail/detail.component';


@NgModule({
  declarations: [
    PokemonComponent,
    FormComponent,
    CatalogComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class PokemonModule { }
