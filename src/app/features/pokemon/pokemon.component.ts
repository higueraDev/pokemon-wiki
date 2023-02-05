import { Component } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { Pokemon } from '../../models/entities/pokemon';
import { FirestoreService } from '../../core/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent {
  public pokemon$: Observable<Pokemon[]>;
  public selectedPokemon: Pokemon | null = null;

  constructor(
    private readonly firestoreService: FirestoreService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pokemon$ = this.firestoreService.getAll();
  }

  addPokemon() {
    const dialogRef = this.dialog.open<FormComponent, {}, Pokemon>(
      FormComponent,
      {
        data: {},
        width: '90%',
        maxWidth:'600px',
      }
    );

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((pokemon) => this.firestoreService.create(pokemon))
      )
      .subscribe();
  }

  updatePokemon() {
    const dialogRef = this.dialog.open<FormComponent, {}, Pokemon>(
      FormComponent,
      {
        data: { ...this.selectedPokemon },
        width: '90%',
        maxWidth:'600px',
      }
    );

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((pokemon) => this.firestoreService.update(pokemon)),
        tap(() => this.selectPokemon())
      )
      .subscribe();
  }

  selectPokemon(pokemon?: Pokemon) {
    this.selectedPokemon = pokemon || null;
    window.scrollTo({
      top:0,
      left:0,
      behavior:'smooth'
    })
  }

  deletePokemon() {
    this.firestoreService.delete(this.selectedPokemon!.id);
    this.selectedPokemon = null;
  }
}
