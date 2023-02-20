import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedType } from "../../types/posts";

const initialState: { feedType: FeedType, searchRequest: string, after: string } = {
    feedType: FeedType.hot,
    searchRequest: '',
    after: ''
}

export const postsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        changeFeedType: (state, action: PayloadAction<FeedType>) => { state.feedType = action.payload; state.after='' },
        setSearchRequest: (state, action: PayloadAction<string>) => {
            state.searchRequest = action.payload; 
            state.feedType = FeedType.search
            state.after = ''
            //if search request starts from r/, that means searching for particular subreddit's posts
            if (action.payload[0] === 'r' && action.payload[1] === '/') {
                state.feedType = FeedType.subreddit
             }
             if (action.payload === '') {
                state.feedType = FeedType.hot
             }
        },
        setAfter: (state, action:PayloadAction<string>) =>{
            state.after = action.payload
        }
    }
})

export default postsSlice.reducer
export const {changeFeedType, setSearchRequest, setAfter} = postsSlice.actions