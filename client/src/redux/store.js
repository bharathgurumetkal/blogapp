//import configureStore
import {configureStore} from '@reduxjs/toolkit'
import userAuthorSlice from './slices/userAutherSlice'

export const store=configureStore({
    reducer:{
        userAuthorLoginReducer:userAuthorSlice
    }
})