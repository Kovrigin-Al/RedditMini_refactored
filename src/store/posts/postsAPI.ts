import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPosts, ITransformedPosts } from '../../types/posts'


export const postsAPI = createApi({
  reducerPath: 'posts/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.reddit.com/',
  }),
  endpoints: build => ({
    getPosts: build.query<ITransformedPosts, { limit?: number, searchParam: string, after?: string }>({
      query: ({ limit = 8, after, searchParam }) => ({
        url: searchParam ? 'search.json' : '.json',
        params: {
          limit,
          ...(after && { after }),
          ...(searchParam && { q: searchParam })
        }
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => { return queryArgs.searchParam ? 'search/' + queryArgs.searchParam : endpointName },
      merge: (currentCache, newItems, otherArgs) => {
        if (otherArgs.arg.after) { currentCache.posts.push(...newItems.posts) } else { currentCache = newItems }
        currentCache.after = newItems.after
        currentCache.hasMore = newItems.hasMore
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.after !== previousArg?.after
      },
      transformResponse: (response: IPosts) => ({ posts: response.data.children, hasMore: !!response.data.after, after: response.data.after })
    }),
  })
})