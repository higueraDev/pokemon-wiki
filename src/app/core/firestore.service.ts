import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private pokemonCollection: CollectionReference<DocumentData>

  constructor(private readonly db: Firestore) { }

}
