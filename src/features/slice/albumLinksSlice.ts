import { createSlice } from '@reduxjs/toolkit';
import { AlbumLinksDTO, InitialStateAlbumLinks } from '../../types/type';

const initialState: InitialStateAlbumLinks = {
    isAlbumLinksFetched: false,
    albumLinks: undefined
};

const albumLinksSlice = createSlice({
    name: 'albumLinks',
    initialState,
    reducers: {
        setIsAlbumLinksFetched: (state): void => {
            state.isAlbumLinksFetched = true;
        },
        removeIsAlbumLinksFetched: (state): void => {
            state.isAlbumLinksFetched = false;
        },
        setAlbumLinks: (state, action): void => {
            const albumLinks: AlbumLinksDTO = action.payload;
            state.albumLinks = albumLinks;
        },
        removeAlbumLinks: (state): void => {
            state.albumLinks = undefined;
        }
    }
});

export const {
    setIsAlbumLinksFetched,
    removeIsAlbumLinksFetched,
    setAlbumLinks,
    removeAlbumLinks
} = albumLinksSlice.actions;

export default albumLinksSlice.reducer;