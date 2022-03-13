import { createReducer } from '@reduxjs/toolkit';
import { KeyCloakDataType } from '../../types/redux/KeyCloakData';
import { setKeycloakToken } from '../actions/keycloak';

const initialState: KeyCloakDataType = {
  token: null,
  loginUrl: null,
};

export const KeycloakReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setKeycloakToken, (state, action) => {
      state.token = action.payload;
    });
});