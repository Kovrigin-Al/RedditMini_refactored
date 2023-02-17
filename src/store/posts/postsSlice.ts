import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedType, IPosts } from "../../types/posts";

const initialState: { feedType: FeedType, searchRequest: string } = {
    feedType: FeedType.hot,
    searchRequest: ''
}

export const postsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        changeFeedType: (state, action: PayloadAction<FeedType>) => { state.feedType = action.payload },
        setSearchRequest: (state, action: PayloadAction<string>) => {
            state.searchRequest = action.payload; 
            state.feedType = FeedType.search
            //if search request starts from r/, that means searching for particular subreddit's posts
            if (action.payload[0] === 'r' && action.payload[1] === '/') {
                state.feedType = FeedType.subreddit
             }
             if (action.payload === '') {
                state.feedType = FeedType.hot
             }
        }
    }
})

export default postsSlice.reducer
export const {changeFeedType, setSearchRequest} = postsSlice.actions