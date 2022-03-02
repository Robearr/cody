import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { KeycloakReducer } from './reducers/KeycloakReducer';

export const store = configureStore({
  reducer: combineReducers({
    keycloak: KeycloakReducer
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;