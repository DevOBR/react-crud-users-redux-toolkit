import { createSlice } from '@reduxjs/toolkit'
import type { User } from '../../types.d'

const DEFAULT_DATA: Array<User> = [
  {
    id: '1',
    name: 'Raul Randal',
    country: 'Mexico'
  },
  {
    id: '2',
    name: 'Luis Gonzales',
    country: 'Colombia'
  },
  {
    id: '3',
    name: 'Carlos Jaramillo',
    country: 'Venezuela'
  }
]

const initialState: Array<User> = (() => {
  const persistanceData = JSON.parse(
    localStorage.getItem('__redux_persistance_state') ?? '{}'
  )

  if (persistanceData) return persistanceData.users
  return DEFAULT_DATA
})()

const slice = createSlice({
  name: 'users',
  initialState, // this can be the object or array
  reducers: {
    deleteUserById: (state, action) => {
      const id = action.payload
      return state.filter((x: User) => x.id !== id)
    },
    addNewUser: (state, action) => {
      const user = action.payload
      const newId = crypto.randomUUID()
      return [...state, { ...user, id: newId }]
    },
    editUser: (state, action) => {
      const editedUser = action.payload
      const userIndex = state.findIndex((x) => x.id === editedUser.id)
      if (userIndex !== -1) {
        const newState = [...state]
        newState[userIndex] = { ...newState[userIndex], ...editedUser }
        return newState
      }
    }
  }
})

export const { deleteUserById, addNewUser, editUser } = slice.actions
export default slice.reducer
