import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPosts, ITransformedPosts } from '../../types/posts'


export const postsAPI = createApi({
  reducerPath: 'posts/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.reddit.com/',
  }),
  endpoints: build => ({
    getPosts: build.query<ITransformedPosts, { limit?: number, after: string }>({
      query: ({ limit = 8, after }) => ({
        url: '.json',
        params: {
          limit,
          ...(after && { after })
        }
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => endpointName,
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.posts.push(...newItems.posts)
        currentCache.after = newItems.after
        currentCache.hasMore = newItems.hasMore
      },
      // Refetch when the after arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      transformResponse: (response: IPosts) => ({ posts: response.data.children, hasMore: !!response.data.after, after: response.data.after })
    }),
    searchPosts: build.query<ITransformedPosts, { limit?: number, searchParam: string, after?: string }>({
      query: ({ limit = 8, searchParam, after = '' }) => ({
        url: 'search.json',
        params: { limit, q: searchParam, ...(after && { after }) }
      }),
      serializeQueryArgs: ({queryArgs}) => { 
        return queryArgs.searchParam},
      merge: (currentCache, newItems) => {
        currentCache.posts.push(...newItems.posts)
        currentCache.after = newItems.after
        currentCache.hasMore = newItems.hasMore
      },
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg
      // },
      transformResponse: (response: IPosts) => ({ posts: response.data.children, hasMore: !!response.data.after, after: response.data.after })
    })
  })
})