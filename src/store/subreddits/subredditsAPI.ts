import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { ISubredditData, ISubredditsResponse } from '../../types/subreddits'


export const subredditsAPI = createApi({
  reducerPath: 'subreddits/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.reddit.com/subreddits/',
  }),
  endpoints: build => ({
    getSubreddits: build.query<ISubredditData[], {limit?: number}>({
        query: ({limit = 10}) => ({
            url: '.json',
            params: {
                limit
            }
        }),
        transformResponse: (response: ISubredditsResponse) => (response.data.children.map(child => child.data))
    }),
  })
})