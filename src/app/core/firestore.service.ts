import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  docData,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, DocumentReference, updateDoc } from '@firebase/firestore';
import { Pokemon } from '../models/entities/pokemon';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private pokemonCollection: CollectionReference<Pokemon>;

  constructor(private readonly db: Firestore) {
    this.pokemonCollection = collection(
      this.db,
      'pokemon'
    ) as CollectionReference<Pokemon>;
  }

  getAll() {
    return collectionData(this.pokemonCollection, {
      idField: 'id',
    });
  }

  get(id: Pokemon['id']) {
    const pokemonDocumentReference = doc(
      this.db,
      `pokemon/${id}`
    ) as DocumentReference<Pokemon>;
    return docData<Pokemon>(pokemonDocumentReference, { idField: 'id' });
  }

  create(pokemon: Pokemon) {
    return addDoc(this.pokemonCollection, pokemon);
  }

  update(pokemon: Pokemon) {
    const pokemonDocumentReference = doc(
      this.db,
      `pokemon/${pokemon.id}`
    ) as DocumentReference<Pokemon>;
    return updateDoc<Pokemon>(pokemonDocumentReference, { ...pokemon });
  }

  delete(id: Pokemon['id']) {
    const pokemonDocumentReference = doc(
      this.db,
      `pokemon/${id}`
    )
    return deleteDoc(pokemonDocumentReference)
  }
}
