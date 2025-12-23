import { TrackModel } from "../../models/TrackModel.js";
import { Requests } from "../../models/RequestsModel.js";
import { AuthPage } from "../../view/pages/AuthPage.js";

export class MainPage {
  private container: HTMLElement;
  private trackModel: TrackModel;
  private requests: Requests;
  private token: string;

  constructor(containerId: string) {
    this.container = document.getElementById("app")!;
    this.trackModel = new TrackModel();
    this.requests = new Requests();
    this.token = localStorage.getItem(`token`)!;
    this.render();
    this.loadData();
    this.bindEvents();
  }

  private async loadData() {
    try {
      const [tracks, favorites] = await Promise.all([
        this.requests.getTracks(this.token),
        this.requests.getFavorites(this.token)
      ]);

      this.trackModel.setTracks(tracks);
      this.trackModel.setFavorites(favorites);
      this.renderTracks();
      this.renderFavorites();
    } catch (error) {
      console.error('Ошибка загрузки данных: ', error);
      this.showError('Не удалось загрузить данные');
    }
  }

  private render(): void {
    this.container.innerHTML = `
    <header class="main-header">
        <h1 class="main-title">Аудиоплеер</h1>
        <button class="btn btn--secondary logout-btn" id="logoutBtn">Выйти</button>
      </header>

      <div class="main-content">
        <aside class="sidebar">
          <div class="favorites-section">
            <h3>Избранное</h3>
            <div id="favoritesList" class="tracks-list"></div>
          </div>
        </aside>

        <main class="main-area">
          <div id="player" class="player"></div>
          <div class="tracks-section">
            <h3>Все треки</h3>
            <div id="tracksList" class="tracks-list"></div>
          </div>
        </main>
      </div>
    `;
  }

  private renderTracks(): void {
    const container = document.getElementById('tracksList');
    if (!container) return;

    container.innerHTML = this.trackModel.tracks.map(track => `
      <div class="track-item" data-track-id="${track.id}">
        <span class="track-title">${track.title}</span>
        <span class="track-artist">${track.artist}</span>
        <button class="track-favorite-btn ${this.isFavorite(track.id) ? 'active' : ''}" data-track-id="${track.id}">❤️</button>
      </div>
      `).join('');
  }

  private renderFavorites(): void {
    const container = document.getElementById('favoritesList') as HTMLElement;

    if (this.trackModel.favorites.length === 0) {
      container.innerHTML = '<p>Избранное пусто</p>';
    } else {
      container.innerHTML = this.trackModel.favorites.map(track => `
        <div class="track-item favorite-item" data-track-id="${track.id}">
          <span class="track-title">${track.title}</span>
          <span class="track-artist">${track.artist}</span>
        </div>
      `).join('');
    }
  }

  private isFavorite(trackId: string): boolean {
    return this.trackModel.favorites.some(fav => fav.id === trackId);
  }

  private async toggleFavorite(trackId: string) {
    try {
      const isCurrentlyFavorite = this.isFavorite(trackId);
      await this.requests.toggleFavorite(this.token, trackId, !isCurrentlyFavorite);

      if(isCurrentlyFavorite) {
        this.trackModel.favorites = this.trackModel.favorites.filter(fav => fav.id !== trackId);
      } else {
        const track = this.trackModel.tracks.find(track => track.id === trackId);
        if (track) this.trackModel.favorites.push(track);
      }

      this.renderTracks();
      this.renderFavorites();
    } catch(error) {
      console.error('Ошибка избранного', error)
    }
  }

  private bindEvents() {
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      localStorage.removeItem('token');
      location.reload();
      // const mainPage = new MainPage('app');
    });

    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if(target.classList.contains('track-favorite-btn')) {
        const trackId = target.dataset.trackId!;
        this.toggleFavorite(trackId);
      }
    })
  }

  private showError(message: string) {
    console.error(message);
  }

}