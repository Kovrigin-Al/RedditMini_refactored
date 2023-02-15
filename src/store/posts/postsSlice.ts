import { createSlice } from "@reduxjs/toolkit";
import { IPosts } from "../../types/posts";

const initialState: IPosts = {
    data: {
        after: '',
        children: [],
        dist: 0,
        modhash: '',
    },
    kind: ''
}

export const postsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {}
})

export default postsSlice.reducer