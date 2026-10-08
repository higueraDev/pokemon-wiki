import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { POKEMON } from './pokemon-data';

describe('Pokédex', () => {
  beforeEach(async () => {
    localStorage.removeItem('pokemon-wiki:favorites');
    history.replaceState(null, '', location.pathname);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent],
    }).compileComponents();
  });
  afterEach(() => localStorage.removeItem('pokemon-wiki:favorites'));
  it('contains all 151 unique entries with complete base stats', () => {
    expect(new Set(POKEMON.map((p) => p.id)).size).toBe(151);
    expect(
      POKEMON.every(
        (p) => p.stats.length === 6 && p.description && p.types.length,
      ),
    ).toBeTrue();
  });
  it('combines case-insensitive search and type filtering', () => {
    const app = new AppComponent();
    app.query = 'BULBA';
    app.type = 'grass';
    expect(app.filtered.map((p) => p.id)).toEqual([1]);
    app.type = 'fire';
    expect(app.filtered).toEqual([]);
  });
  it('supports padded Pokédex numbers', () => {
    const app = new AppComponent();
    app.query = '#025';
    expect(app.filtered.map((p) => p.name)).toEqual(['pikachu']);
    app.query = '025';
    expect(app.filtered.map((p) => p.name)).toEqual(['pikachu']);
    app.query = '#000';
    expect(app.filtered).toEqual([]);
  });
  it('sorts names and reverses numbers', () => {
    const app = new AppComponent();
    app.sort = 'name';
    expect(app.filtered[0].name).toBe('abra');
    app.sort = 'reverse';
    expect(app.filtered[0].id).toBe(151);
  });
  it('persists favorites and removes them from the saved view', () => {
    const app = new AppComponent();
    app.toggleFavorite(POKEMON[24]);
    const restored = new AppComponent();
    restored.favoritesOnly = true;
    expect(restored.filtered.map((p) => p.id)).toEqual([25]);
    restored.toggleFavorite(POKEMON[24]);
    expect(restored.filtered.length).toBe(0);
  });
  it('recovers from malformed saved values', () => {
    localStorage.setItem('pokemon-wiki:favorites', '{broken');
    expect(new AppComponent().favorites.size).toBe(0);
    localStorage.setItem('pokemon-wiki:favorites', '{}');
    expect(new AppComponent().favorites.size).toBe(0);
  });
  it('renders a populated catalog and accessible controls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('.pokemon-card').length).toBe(24);
    expect(element.querySelector('input')?.getAttribute('aria-label')).toBe(
      'Search by name or number',
    );
    expect(element.querySelector('h1')?.textContent).toContain(
      'Little legends.',
    );
  });
});
