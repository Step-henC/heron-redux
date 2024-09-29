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
import glycoFormSlice from './redux/glycoFormSlice';
import contactFormSlice from './redux/contactFormSlice';

const persistConfig = {
  key: 'heron-file',
  storage: storageSession,
  blacklist: ['app', 'glycoform', 'contactFormSlice'],
};

const rootReducer = combineReducers({
  app: appSlice,
  quantform: quantformSlice,
  glycoform: glycoFormSlice,
  contactForm: contactFormSlice,
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
