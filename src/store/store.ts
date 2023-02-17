import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { postsAPI } from './posts/postsAPI';
import { subredditsAPI } from './subreddits/subredditsAPI';
import toastReducer from './toastSlice';
import postsReducer from './posts/postsSlice';

export const store = configureStore({
  reducer: {
    [postsAPI.reducerPath]: postsAPI.reducer,
    posts: postsReducer, 
    toasts: toastReducer,
    [subredditsAPI.reducerPath]: subredditsAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsAPI.middleware, subredditsAPI.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
