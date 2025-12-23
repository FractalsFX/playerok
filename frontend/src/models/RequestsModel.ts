export class Requests {
    private baseUrl = 'http://localhost:8001/api';

    async register(username: string, password: string) {
        const response = await fetch(`${this.baseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Ошибка сервера' }));
            throw new Error(error.message || `Ошибка ${response.status}`);
        }

        return await response.json();
    }

    async login(username: string, password: string) {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Ошибка сервера' }));
            throw new Error(error.message || `Ошибка ${response.status}`);
        }

        return await response.json();
    }

    async getTracks(token: string) {
        const response = await fetch(`${this.baseUrl}/tracks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Ошибка загрузки треков');
        return await response.json();
    }

    async getFavorites(token: string) {
        const response = await fetch(`${this.baseUrl}/favorites`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Ошибка загрузки избранных треков');
        return await response.json();
    }

    async toggleFavorite(token: string, trackId: string, add: boolean) {
        const method = add ? "POST" : "DELETE";
        const response = await fetch(`${this.baseUrl}/favorites`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ trackId })
        });

        if (!response.ok) throw new Error('Ошибка добавления/удаления трека в/из в избранное/го');
        return await response.json();
    }
}