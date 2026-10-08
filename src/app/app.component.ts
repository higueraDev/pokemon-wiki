import { Component, ElementRef, ViewChild } from '@angular/core';
import { POKEMON } from './pokemon-data';

type Pokemon = (typeof POKEMON)[number];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('detail') detail: ElementRef<HTMLDialogElement>;
  readonly pokemon = POKEMON;
  readonly types = [...new Set(POKEMON.flatMap((p) => p.types))].sort();
  query = '';
  type = '';
  sort = 'number';
  favoritesOnly = false;
  favorites = new Set<number>();
  limit = 24;
  selected: Pokemon | null = null;
  notice = '';
  private opener: HTMLElement | null = null;

  constructor() {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem('pokemon-wiki:favorites') || '[]',
      );
      if (Array.isArray(saved))
        this.favorites = new Set(
          saved.filter((id) => Number.isInteger(id) && id >= 1 && id <= 151),
        );
    } catch {
      this.notice = 'Saved favorites are unavailable in this browser.';
    }
    const params = new URLSearchParams(location.search);
    this.query = params.get('q') || '';
    this.type = this.types.includes(params.get('type') || '')
      ? params.get('type')!
      : '';
  }

  get filtered(): Pokemon[] {
    const rawQuery = this.query.trim().toLowerCase();
    const query = /^#?\d+$/.test(rawQuery)
      ? String(Number(rawQuery.replace('#', '')))
      : rawQuery;
    return this.pokemon
      .filter(
        (p) =>
          (!query || p.name.includes(query) || String(p.id) === query) &&
          (!this.type || p.types.includes(this.type)) &&
          (!this.favoritesOnly || this.favorites.has(p.id)),
      )
      .sort((a, b) =>
        this.sort === 'name'
          ? a.name.localeCompare(b.name)
          : this.sort === 'reverse'
            ? b.id - a.id
            : a.id - b.id,
      );
  }

  update(): void {
    this.limit = 24;
    const url = new URL(location.href);
    this.query
      ? url.searchParams.set('q', this.query)
      : url.searchParams.delete('q');
    this.type
      ? url.searchParams.set('type', this.type)
      : url.searchParams.delete('type');
    history.replaceState(null, '', url);
  }

  reset(): void {
    this.query = '';
    this.type = '';
    this.sort = 'number';
    this.favoritesOnly = false;
    this.update();
  }
  setCollection(saved: boolean): void {
    this.favoritesOnly = saved;
    this.update();
  }
  toggleFavorite(p: Pokemon): void {
    this.favorites.has(p.id)
      ? this.favorites.delete(p.id)
      : this.favorites.add(p.id);
    try {
      localStorage.setItem(
        'pokemon-wiki:favorites',
        JSON.stringify([...this.favorites]),
      );
    } catch {
      this.notice =
        'Favorites are available for this visit, but could not be saved.';
    }
  }
  open(p: Pokemon): void {
    this.opener = document.activeElement as HTMLElement;
    this.selected = p;
    this.detail.nativeElement.showModal();
  }
  close(): void {
    this.detail.nativeElement.close();
  }
  restoreFocus(): void {
    this.opener?.focus();
  }
  backdrop(event: MouseEvent): void {
    if (event.target === this.detail.nativeElement) this.close();
  }
  surprise(): void {
    this.open(this.pokemon[Math.floor(Math.random() * this.pokemon.length)]);
  }
  trackPokemon(_: number, pokemon: Pokemon): number {
    return pokemon.id;
  }
  number(id: number): string {
    return String(id).padStart(3, '0');
  }
  statName(name: string): string {
    return (
      (
        {
          hp: 'HP',
          attack: 'Attack',
          defense: 'Defense',
          'special-attack': 'Sp. Atk',
          'special-defense': 'Sp. Def',
          speed: 'Speed',
        } as Record<string, string>
      )[name] || name
    );
  }
}
