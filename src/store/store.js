import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        blogs: [],
        filterBlogs: [],
        loading: true,
        signedIn: false
    },
    mutations: {
        getBlogs: (state, payload) => {
            console.log('BLOGS (using VueX): ', payload)
            state.blogs = payload
            state.loading = false;
        }
    },
    actions: {
        getBlogs: (context) => {
            context.loading = true
            const axios = require("axios");
            axios
                .get("https://whyamiaclevelandfan.firebaseio.com/posts.json")
                .then(data => {
                    const _blogs = data.data;
                    const blogsArray = [];
                    // Add Firebase unqiue ID to object for routing
                    for (let key in _blogs) {
                        _blogs[key].id = key;
                        blogsArray.push(_blogs[key]);
                    }
                    // Sort by most recent
                    blogsArray.sort((a, b) => {
                        return b.timestamp - a.timestamp;
                    });
                    context.commit('getBlogs', blogsArray)
                    // context.loading = false -- Why doesn't this work? 
                });
        }
    }
})