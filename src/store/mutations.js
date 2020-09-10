import { ADD_NEW_BLOG, UPDATE_BLOG, DONE_LOADING, USER_SIGN_IN, USER_LOG_OUT_COMMIT } from './mutation-types'

export const mutations = {
    [ADD_NEW_BLOG]: (state, blog) => {
        state.blogs.push(blog)
    },
    [UPDATE_BLOG]: (state, updatedBlog) => {
        // remove changed blog from current state
        state.blogs = state.blogs.filter(blog => {
            return blog.id != updatedBlog.id
        })
        // push updated blog back on blogs
        state.blogs.push(updatedBlog)
    },
    [DONE_LOADING]: (state) => {
        state.loading = false
    },
    [USER_SIGN_IN]: (state, { name, id }) => {
        state.signedIn = true
        state.user.name = name
        state.user.id = id
    },
    [USER_LOG_OUT_COMMIT]: (state) => {
        state.signedIn = false;
        state.user.name = ""
        state.user.id = null
    }
}