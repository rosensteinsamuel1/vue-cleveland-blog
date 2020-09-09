export const mutations = {
    addBlog: (state, blog) => {
        state.blogs.push(blog)
    },
    removeBlog: (state, modifiedId) => {
        state.blogs = state.blogs.filter(blog => {
            return blog.id != modifiedId
        })
    },
    doneLoading: (state) => {
        state.loading = false
    },
    signInUser: (state, { name, id }) => {
        state.signedIn = true
        state.user.name = name
        state.user.id = id
    },
    logOut: (state) => {
        state.signedIn = false;
        state.user.name = ""
        state.user.id = null
    }
}