import Vue from 'vue'
import Vuex from 'vuex'
import { DB } from '../firebase/db'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        blogs: [],
        filterBlogs: [],
        loading: true,
        signedIn: false,
        username: ""
    },
    mutations: {
        getBlogs: (state, payload) => {
            console.log('BLOGS (using VueX): ', payload)
            state.blogs = payload
            state.loading = false;
        },
        signIn: (state) => {
            state.signedIn = true
        },
        logOut: (state) => {
            state.signedIn = false,
                state.username = ""
        },
        setUsername: (state, payload) => {
            console.log('payload.username: ', payload.username)
            state.username = payload.username
        }
    },
    actions: {
        getBlogs: (context) => {
            context.loading = true
            DB.collection('posts').get().then(result => {
                const _blogs = []
                result.docs.map(doc => {
                    _blogs.push(doc.data())
                })
                context.commit('getBlogs', _blogs)
            })
            // return snapshot.docs.map(doc => (doc.data()))
        }
    }
})