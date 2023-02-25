import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGetPostCommentsData } from '../../types/comments'
import { IPosts, ITransformedPosts } from '../../types/posts'
import { IReply } from '../../types/replies'


export const postsAPI = createApi({
  reducerPath: 'posts/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.reddit.com/',
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
    getPostComments: build.query<{ comments: IGetPostCommentsData[], more: Record<string, string[]> }, { postId: string, limit?: number, depth?: number, threaded?: boolean, truncate?: boolean }>({
      query: ({ postId, limit = 10, depth = 0, threaded = false, truncate = true }) => {
        return {
          url: `/comments/${postId}`,
          params: { limit, depth, threaded, truncate }
        }
      },
      transformResponse: (response: [{}, { data: { children: IGetPostCommentsData[] } }]) => {
        const commentsResponseData = response[1].data.children
        const comments = commentsResponseData.filter(res => res.kind === 't1')
        const moreArr = commentsResponseData.filter(res => res.kind === 'more')
        const more = moreArr.reduce((accumulator, current) => ({ ...accumulator, [current.data.parent_id]: current.data.children }), {})

        return { comments, more }
      },
    }),
    getCommentReplies: build.query<{ replies: IReply[], more: Record<string, string[]>  }, { parentId: string, subredditName: string, postId: string }>({
      query: ({ parentId, subredditName, postId }) => {
        return {
          url: `${subredditName}/comments/${postId}/comment/${parentId}.json`,
          params: {
          }
        }
      },
      transformResponse: (response: any) => {
        const allReplies = response[1].data.children[0].data.replies.data.children
        const replies = allReplies.filter((reply: IReply) => reply.kind === 't1') 
        const moreArr = allReplies.filter((reply: IReply) => reply.kind === 'more') 
        const more =  moreArr.reduce((accumulator: IReply, current: IReply) => ({ ...accumulator, [current.data.parent_id]: current.data.children }), {}) 

        return { replies, more }
      },
    }
    ),

  })
})
