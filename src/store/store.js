import Vue from 'vue'
import Vuex from 'vuex'

import { actions } from './actions'
import { mutations } from './mutations'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        blogs: [],
        search: "",
        loading: true,
        signedIn: false,
        user: {
            name: "",
            id: ""
        }
    },
    getters: {
        filterBlogs: state => {
            const orderedBlogs = state.blogs.sort((a, b) => b.timestamp - a.timestamp)
            return orderedBlogs.filter(blog => {
                return (
                    blog.title.toLowerCase().match(state.search) ||
                    blog.content.toLowerCase().match(state.search) ||
                    blog.author.toLowerCase().match(state.search)
                );
            });
        }
    },
    mutations,
    actions
})