import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PERSIST,
  persistReducer,
  persistStore,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER,
} from 'redux-persist';
import appSlice from './redux/appSlice';
import quantformSlice from './redux/quantformSlice';

const persistConfig = {
  key: 'heron-file',
  storage: storageSession,
  blacklist: ['app'],
};

const rootReducer = combineReducers({
  app: appSlice,
  quantform: quantformSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
