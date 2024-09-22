import { configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, WebStorage } from 'redux-persist';
import { combineReducers } from 'redux';

import artistLinksReducer from '../features/slice/artistLinksSlice';
import albumLinksReducer from '../features/slice/albumLinksSlice';

interface PersistConfig {
    key: string, 
    storage: WebStorage
};

const persistConfig: PersistConfig = {
    key: 'root',
    storage: storageSession
};

const reducers = combineReducers({
    artistLinks: artistLinksReducer,
    albumLinks: albumLinksReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer
});

export default store;