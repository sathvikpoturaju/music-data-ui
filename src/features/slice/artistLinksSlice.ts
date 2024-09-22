import { createSlice } from '@reduxjs/toolkit';
import { ArtistLinksDTO, InitialStateArtistLinks } from '../../types/type';

const initialState: InitialStateArtistLinks = {
    isArtistLinksFetched: false,
    artistLinks: undefined
};

const artistLinksSlice = createSlice({
    name: 'artistLinks',
    initialState,
    reducers: {
        setIsArtistLinksFetched: (state): void => {
            state.isArtistLinksFetched = true;
        },
        removeIsArtistLinksFetched: (state): void => {
            state.isArtistLinksFetched = false;
        },
        setArtistLinks: (state, action): void => {
            const artistLinks: ArtistLinksDTO = action.payload;
            state.artistLinks = artistLinks;
        },
        removeArtistLinks: (state): void => {
            state.artistLinks = undefined;
        }
    }
});

export const {
    setIsArtistLinksFetched,
    removeIsArtistLinksFetched,
    setArtistLinks,
    removeArtistLinks
} = artistLinksSlice.actions;

export default artistLinksSlice.reducer;