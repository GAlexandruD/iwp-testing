import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import fastfoodReducer from "./slices/fastfoodSlice";
import latLongReducer from "./slices/latLongSlice";
import userReducer from "./slices/userSlice";
import recipeReducer from "./slices/recipeSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  user: userReducer,
  fastfood: fastfoodReducer,
  latLong: latLongReducer,
  recipes: recipeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
