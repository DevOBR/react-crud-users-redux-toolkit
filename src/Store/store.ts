import { configureStore } from '@reduxjs/toolkit'
import reducer from './users/usersReducer'
const persistanceMiddleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem(
    '__redux_persistance_state',
    JSON.stringify(store.getState())
  )
}

export const store = configureStore({
  reducer: {
    users: reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistanceMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
