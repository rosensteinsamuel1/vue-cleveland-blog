import Vue from 'vue'
import Vuex from 'vuex'
import { DB } from '../firebase/db'
import { Auth } from '../firebase/auth'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        blogs: [],
        filterBlogs: [],
        loading: true,
        signedIn: false,
        user: {
            name: "",
            id: ""
        }
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
            state.signedIn = false;
            state.user.name = ""
        },
        setUser: (state, payload) => {
            console.log('payload.user: ', payload.name)
            state.user.name = payload.name
            state.user.id = payload.id
        }
    },
    actions: {
        getBlogs: (context) => {
            context.loading = true
            DB.collection('posts').get().then(result => {
                const _blogs = []
                result.docs.map(doc => {
                    _blogs.push({ ...doc.data(), id: doc.id })
                })
                context.commit('getBlogs', _blogs)
            })
        },
        retrieveUser: (context) => {
            Auth.onAuthStateChanged((user) => {
                if (user === null) {
                    context.user.id = null
                } else {
                    console.log('user is alread logged in!')
                    context.dispatch('getUser', user.uid)
                    // router.replace('/forum')
                }
            })
        },
        getUser: (context, uid) => {
            console.log('getUser: ', uid)
            DB.collection("users")
                .doc(uid)
                .get()
                .then(doc => {
                    console.log("doc.data(): ", doc);
                    context.commit('signIn');
                    context.commit('setUser', {
                        name: doc.data().username,
                        id: doc.id
                    });
                });
        }

    }
})