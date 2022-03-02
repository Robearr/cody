import { createAction } from '@reduxjs/toolkit';

export const setKeycloakToken = createAction<string>('SET_KEYCLOAK_TOKEN');
