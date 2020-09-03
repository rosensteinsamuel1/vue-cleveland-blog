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
            state.blogs = payload
            state.loading = false;
        },
        signInUser: (state, payload) => {
            state.signedIn = true
            state.user.name = payload.name
            state.user.id = payload.id
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
                    if (!user.name) {
                        context.dispatch('getUserInfo', user.uid)
                    }
                }
            })
        },
        signInNewUser: (context, user) => {
            console.log('signInNewUser')
            DB.collection("users")
                .doc(user.id)
                .set({
                    username: user.username,
                    email: user.email
                })
                .then(() => {
                    context.dispatch('getUserInfo', user.id)

                })
                .catch(err => {
                    console.log("ERROR: ", err);
                });
        },
        getUserInfo: (context, uid) => {
            DB.collection("users")
                .doc(uid)
                .get()
                .then(doc => {
                    console.log("doc.data(): ", doc);
                    context.commit('signInUser', {
                        name: doc.data().username,
                        id: doc.id
                    });
                });
        }
    }
})