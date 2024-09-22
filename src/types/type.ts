export interface ArtistLinksDTO {
    id: string;
    artistName: string;
    description: string;
    profilePictureUrl: string;
    bannerUrl: string;
    links: LinkDTO[];
};

export interface AlbumLinksDTO {
    id: string;
    albumName: string;
    coverArtUrl: string;
    artistName: string;
    links: LinkDTO[];
};

export interface LinkDTO {
    storeName: string;
    storeLogoUrl: string;
    albumUrl?: string;
    artistUrl?: string;
};

export interface InitialStateArtistLinks {
    isArtistLinksFetched: boolean;
    artistLinks: ArtistLinksDTO | undefined;
};

export interface InitialStateAlbumLinks {
    isAlbumLinksFetched: boolean;
    albumLinks: AlbumLinksDTO | undefined;
};

export interface ArtistLinksSlice extends InitialStateArtistLinks {};
export interface AlbumLinksSlice extends InitialStateAlbumLinks {};

export interface Store {
    artistLinks: ArtistLinksSlice;
    albumLinks: AlbumLinksSlice
};