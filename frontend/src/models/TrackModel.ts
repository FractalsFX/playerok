export interface Track {
    id: string,
    title: string,
    artist: string,
    duration: number,
    size_mb: number,
    encoded_audio: string
}

export interface PlayerState {
    currentTrack: Track | null,
    isPlaying: boolean,
    currentTime: number,
    duration: number
}

export class TrackModel {
    public tracks: Track[] = [];
    public favorites: Track[] = [];
    public playerState: PlayerState = {
        currentTrack: null,
        isPlaying: false,
        currentTime: 0,
        duration: 0
    };

    public setTracks(tracks: Track[]) {
        this.tracks = tracks;
    }

    public setFavorites(favorites: Track[]) {
        this.favorites = favorites;
    }

    public updatePlayerState(state: Partial<PlayerState>) {
        Object.assign(this.playerState, state)
    }
}