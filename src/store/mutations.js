export const mutations = {
    addBlog: (state, blog) => {
        state.blogs.push(blog)
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