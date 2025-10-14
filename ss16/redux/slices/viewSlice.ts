import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ViewMode = 'list' | 'grid'

type ViewState = {
  mode: ViewMode
  columns: number
}

const initialState: ViewState = {
  mode: 'list',
  columns: 1,
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ViewMode>) => {
      state.mode = action.payload
      state.columns = action.payload === 'grid' ? 2 : 1
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'list' ? 'grid' : 'list'
      state.columns = state.mode === 'grid' ? 2 : 1
    },
    setColumns: (state, action: PayloadAction<number>) => {
      state.columns = Math.max(1, Math.floor(action.payload))
      state.mode = state.columns > 1 ? 'grid' : 'list'
    },
  },
})

export const { setMode, toggleMode, setColumns } = viewSlice.actions
export default viewSlice.reducer

export const selectViewMode = (state: { view: ViewState }) => state.view.mode
export const selectColumns = (state: { view: ViewState }) => state.view.columns
