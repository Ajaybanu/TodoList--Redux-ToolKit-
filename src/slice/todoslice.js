import { createSlice } from '@reduxjs/toolkit';


const todoslice=createSlice({
    name:'todo',
    initialState:{
        items:[]
    },
    reducers:{
        additem:(state,action)=>{
            state.items.push(action.payload)
        },
        deleteitem:(state,action)=>{
            const itemid=action.payload
            state.items=state.items.filter(item=>item.id !==itemid)
        },
        edititem: (state, action) => {
            const { id, text } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
              state.items[itemIndex].text = text;
            }
          }
    }
})

export const {additem,deleteitem,edititem}=todoslice.actions
export default todoslice.reducer