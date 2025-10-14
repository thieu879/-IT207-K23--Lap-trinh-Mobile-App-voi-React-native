import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
  id: string
  name: string
  favorite: boolean
}

type UsersState = {
  users: User[]
}

const initialState: UsersState = {
  users: [
    { id: 'u1', name: 'Nguyễn Văn A', favorite: false },
    { id: 'u2', name: 'Nguyễn Văn B', favorite: true },
    { id: 'u3', name: 'Nguyễn Văn C', favorite: false },
    { id: 'u4', name: 'Nguyễn Văn D', favorite: true },
    { id: 'u5', name: 'Trần Thị E', favorite: false },
  ],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const u = state.users.find(x => x.id === action.payload)
      if (u) u.favorite = !u.favorite
    },
    setFavoriteById: (state, action: PayloadAction<{ id: string; favorite: boolean }>) => {
      const u = state.users.find(x => x.id === action.payload.id)
      if (u) u.favorite = action.payload.favorite
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(x => x.id !== action.payload)
    },
  },
})

export const { toggleFavorite, setFavoriteById, setUsers, addUser, removeUser } = usersSlice.actions
export default usersSlice.reducer

export const selectUsers = (state: { users: UsersState }) => state.users.users
export const selectFavoriteCount = (state: { users: UsersState }) =>
  state.users.users.filter(u => u.favorite).length
