import ShowBlogs from './components/ShowBlogs.vue'
import ShowSingleBlog from './components/ShowSingleBlog.vue'

export default [
    { path: "/", component: ShowBlogs },
    { path: "/blog/:id", component: ShowSingleBlog }
]