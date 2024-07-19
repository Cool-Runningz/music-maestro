export interface Player {
    readonly _options: Spotify.PlayerInit & { id: string };

    connect(): Promise<boolean>;
    disconnect(): void;
    getCurrentState(): Promise<Spotify.PlaybackState | null>;
    getVolume(): Promise<number>;
    nextTrack(): Promise<void>;

    addListener: Spotify.AddListenerFn;
    on: Spotify.AddListenerFn;

    removeListener(
        event: "ready" | "not_ready" | Spotify.ErrorTypes | "player_state_changed",
        cb?: Spotify.ErrorListener | Spotify.PlaybackInstanceListener | Spotify.PlaybackStateListener,
    ): void;

    pause(): Promise<void>;
    previousTrack(): Promise<void>;
    resume(): Promise<void>;
    seek(pos_ms: number): Promise<void>;
    setName(name: string): Promise<void>;
    setVolume(volume: number): Promise<void>;
    togglePlay(): Promise<void>;

    activateElement(): Promise<void>;
}

export interface Track {
    album: Album;
    artists: Entity[];
    duration_ms: number;
    id: string | null;
    is_playable: boolean;
    name: string;
    uid: string;
    uri: string;
    media_type: "audio" | "video";
    type: "track" | "episode" | "ad";
    track_type: "audio" | "video";
    linked_from: {
        uri: string | null;
        id: string | null;
    };
}

interface Image {
    height?: number | null | undefined;
    url: string;
    size?: string | null | undefined;
    width?: number | null | undefined;
}

interface Entity {
    name: string;
    uri: string;
    url: string;
}

interface Album {
    name: string;
    uri: string;
    images: Image[];
}
