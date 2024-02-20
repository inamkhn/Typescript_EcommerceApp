import { configureStore,combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userAPI } from './api/userApi';
import { userSlice } from './reducers/userSlice';


const rootReducer = combineReducers({ 
  [userAPI.reducerPath]: userAPI.reducer,
  [userSlice.name]: userSlice.reducer
 });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })


export const persistor = persistStore(store);