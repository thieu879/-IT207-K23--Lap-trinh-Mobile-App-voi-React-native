import { configureStore } from '@reduxjs/toolkit'
import countReducer from '../slices/CountSlice'
import randomReducer from '../slices/RandomSlice'
import viewReducer from '../slices/viewSlice'
import usersReducer from '../slices/usersSlice'
import languageReducer from '../slices/languageSlice'

export const store = configureStore({
    reducer: {
        count: countReducer,
        random: randomReducer,
        view: viewReducer,
        users: usersReducer,
        language: languageReducer,
    },
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;