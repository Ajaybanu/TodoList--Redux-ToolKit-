import { configureStore } from '@reduxjs/toolkit'
import todoslice from '../slice/todoslice'

export default configureStore({
    reducer:{
        todo:todoslice
    }
})